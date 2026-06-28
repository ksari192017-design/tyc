import React, { useState, useEffect } from 'react';

interface Topic {
  topic_name: string;
  subject: string;
  summary_bullets: string[];
  mcqs: MCQ[];
  pyq_patterns: any[];
  estimated_read_time_minutes: number;
}

interface MCQ {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  selected?: string;
  showExplanation?: boolean;
}

interface Brief {
  generated_at: string;
  mode: 'coverage' | 'revision';
  topics: Topic[];
  loop_metadata: {
    topics_discovered: number;
    topics_selected: number;
    retries: number;
    total_tokens_used: number;
  };
}

export const SkillLoop = () => {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

  // Demo data - simulates what the loop generates at 5AM
  const demoBrief: Brief = {
    generated_at: new Date().toISOString(),
    mode: 'revision',
    topics: [
      {
        topic_name: 'Database Normalisation',
        subject: 'DBMS',
        summary_bullets: [
          '1NF: Eliminate repeating groups, each cell contains atomic value only',
          '2NF: Remove partial dependencies (all non-key attrs depend on full key)',
          '3NF: Remove transitive dependencies (non-key attrs depend only on key)',
          'BCNF: Stronger 3NF - every determinant must be a candidate key',
          'Real-world analogy: Like organising a kirana store bill - each item separate (1NF), items grouped by category (2NF), no duplicate customer info (3NF)'
        ],
        mcqs: [
          {
            question: 'Which normal form eliminates transitive dependencies?',
            options: ['1NF', '2NF', '3NF', 'BCNF'],
            answer: 'C',
            explanation: '3NF removes transitive dependencies where a non-prime attribute depends on another non-prime attribute.',
            difficulty: 'easy'
          },
          {
            question: 'A relation is in BCNF if:',
            options: [
              'It is in 3NF',
              'Every determinant is a candidate key',
              'It has no multi-valued dependencies',
              'All attributes are prime'
            ],
            answer: 'B',
            explanation: 'BCNF requires that for every functional dependency X→Y, X must be a superkey (candidate key).',
            difficulty: 'medium'
          },
          {
            question: 'If R(A,B,C) has FDs: A→B, B→C, what is the highest normal form?',
            options: ['1NF', '2NF', '3NF', 'Not even 2NF'],
            answer: 'B',
            explanation: 'A is the key. B→C is a transitive dependency (non-key depending on non-key), violating 3NF. But it satisfies 2NF as there\'s no partial dependency.',
            difficulty: 'hard'
          },
          {
            question: 'Which of the following is NOT a benefit of normalization?',
            options: [
              'Reduced data redundancy',
              'Improved query performance',
              'Better data integrity',
              'Easier maintenance'
            ],
            answer: 'B',
            explanation: 'Normalization can actually decrease query performance due to increased joins. Denormalization is sometimes done for performance.',
            difficulty: 'medium'
          },
          {
            question: 'In 1NF, which condition must be satisfied?',
            options: [
              'All attributes must be numeric',
              'Each cell must contain a single atomic value',
              'No two rows can be identical',
              'Primary key must be defined'
            ],
            answer: 'B',
            explanation: '1NF requires atomicity - each cell contains exactly one value, no repeating groups or arrays.',
            difficulty: 'easy'
          }
        ],
        pyq_patterns: [
          { pattern: 'Define 3NF with example', year: 2024, marks: 5 },
          { pattern: 'Convert unnormalized table to 3NF', year: 2023, marks: 10 },
          { pattern: 'Difference between 2NF and 3NF', year: 2024, marks: 3 }
        ],
        estimated_read_time_minutes: 7
      },
      {
        topic_name: 'OS - Process Scheduling',
        subject: 'Operating Systems',
        summary_bullets: [
          'FCFS: First Come First Serve - simple but causes convoy effect',
          'SJF: Shortest Job First - optimal avg waiting time but needs burst time prediction',
          'Round Robin: Time quantum based, good for time-sharing systems',
          'Priority Scheduling: Can cause starvation, use aging to prevent',
          'Real-world analogy: Like college canteen queue - FCFS is normal queue, SJF serves quick orders first, RR gives each person 2 min turn'
        ],
        mcqs: [
          {
            question: 'Which scheduling algorithm suffers from convoy effect?',
            options: ['FCFS', 'SJF', 'Round Robin', 'Priority'],
            answer: 'A',
            explanation: 'FCFS causes convoy effect where short processes wait behind a long CPU-bound process.',
            difficulty: 'easy'
          },
          {
            question: 'The optimal average waiting time is achieved by:',
            options: ['FCFS', 'SJF', 'Round Robin', 'Priority Scheduling'],
            answer: 'B',
            explanation: 'SJF (Shortest Job First) gives the minimum average waiting time, but requires knowing burst times in advance.',
            difficulty: 'easy'
          },
          {
            question: 'In Round Robin, if time quantum is too large, it degenerates to:',
            options: ['SJF', 'FCFS', 'Priority', 'LIFO'],
            answer: 'B',
            explanation: 'Large time quantum means processes complete without preemption, making RR behave like FCFS.',
            difficulty: 'medium'
          },
          {
            question: 'Aging in priority scheduling is used to:',
            options: [
              'Increase priority of old processes',
              'Prevent starvation',
              'Reduce context switching',
              'Improve throughput'
            ],
            answer: 'B',
            explanation: 'Aging gradually increases priority of waiting processes to ensure they eventually get CPU time.',
            difficulty: 'medium'
          },
          {
            question: 'Context switching overhead is HIGHEST in:',
            options: ['FCFS', 'SJF', 'Round Robin', 'None of these'],
            answer: 'C',
            explanation: 'Round Robin has frequent context switches after each time quantum, leading to higher overhead.',
            difficulty: 'hard'
          }
        ],
        pyq_patterns: [
          { pattern: 'Compare FCFS and RR scheduling', year: 2024, marks: 5 },
          { pattern: 'Calculate avg waiting time for given processes', year: 2023, marks: 10 },
          { pattern: 'What is starvation? How to prevent?', year: 2022, marks: 3 }
        ],
        estimated_read_time_minutes: 8
      }
    ],
    loop_metadata: {
      topics_discovered: 8,
      topics_selected: 2,
      retries: 0,
      total_tokens_used: 4200
    }
  };

  useEffect(() => {
    // Simulate loading brief from Firestore
    setTimeout(() => {
      setBrief(demoBrief);
      setLoading(false);
    }, 1500);
  }, []);

  const handleMCQSelect = (topicIndex: number, mcqIndex: number, option: string) => {
    if (!brief) return;
    
    const updatedBrief = { ...brief };
    const mcq = updatedBrief.topics[topicIndex].mcqs[mcqIndex];
    
    if (mcq.selected) return; // Already answered
    
    mcq.selected = option;
    mcq.showExplanation = true;
    
    setBrief(updatedBrief);
  };

  const getOptionClass = (mcq: MCQ, option: string, optionIndex: number) => {
    const optionLabels = ['A', 'B', 'C', 'D'];
    const label = optionLabels[optionIndex];
    
    if (!mcq.selected) {
      return 'border-neutral-200 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer';
    }
    
    if (label === mcq.answer) {
      return 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-300';
    }
    
    if (label === mcq.selected && label !== mcq.answer) {
      return 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-300';
    }
    
    return 'border-neutral-200 dark:border-neutral-700 opacity-50';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-neutral-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Loading Your Morning Brief</h2>
          <p className="text-slate-500 dark:text-slate-400">Generated at 5:00 AM today</p>
        </div>
      </div>
    );
  }

  if (!brief || brief.topics.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-neutral-900">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Brief Available</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-4">The loop couldn't generate your brief today. Check back tomorrow!</p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            Regenerate Brief
          </button>
        </div>
      </div>
    );
  }

  const currentTopic = brief.topics[selectedTopicIndex];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <div>
              <h1 className="text-2xl font-bold">Good Morning!</h1>
              <p className="text-blue-100 text-sm">Your daily study brief is ready</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
              <span>📊</span>
              <span>{brief.mode === 'revision' ? 'Revision Mode' : 'Coverage Mode'}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
              <span>⏱️</span>
              <span>~{brief.topics.reduce((acc, t) => acc + t.estimated_read_time_minutes, 0)} min total</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
              <span>🎯</span>
              <span>{brief.topics.length} topics selected from {brief.loop_metadata.topics_discovered} discovered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-6">
        {/* Topic Tabs */}
        <div className="flex gap-2 overflow-x-auto py-4">
          {brief.topics.map((topic, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTopicIndex(idx)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl font-medium transition-all ${
                selectedTopicIndex === idx
                  ? 'bg-white dark:bg-neutral-800 shadow-lg text-blue-600 dark:text-blue-400 border-2 border-blue-600'
                  : 'bg-white/60 dark:bg-neutral-800/60 text-slate-600 dark:text-slate-400 border-2 border-transparent hover:border-slate-300 dark:hover:border-neutral-600'
              }`}
            >
              <div className="text-sm">{topic.subject}</div>
              <div className="text-xs truncate max-w-[150px]">{topic.topic_name}</div>
            </button>
          ))}
        </div>

        {/* Topic Content */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💡</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Key Concepts</h2>
              <span className="ml-auto text-sm text-slate-500 dark:text-slate-400">
                ~{currentTopic.estimated_read_time_minutes} min read
              </span>
            </div>
            <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-3">
              {currentTopic.topic_name}
            </h3>
            <ul className="space-y-3">
              {currentTopic.summary_bullets.map((bullet, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PYQ Patterns */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📝</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Previous Year Patterns</h2>
            </div>
            <div className="space-y-3">
              {currentTopic.pyq_patterns.map((pattern, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-neutral-900 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-800 dark:text-slate-200">{pattern.pattern}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Last asked: {pattern.year}</div>
                  </div>
                  <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                    {pattern.marks} marks
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MCQ Drill */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Quick MCQ Drill</h2>
              <span className="ml-auto text-sm text-slate-500 dark:text-slate-400">
                {currentTopic.mcqs.filter(m => m.selected && m.selected === m.answer).length}/{currentTopic.mcqs.length} correct
              </span>
            </div>
            
            <div className="space-y-6">
              {currentTopic.mcqs.map((mcq, mcqIdx) => (
                <div key={mcqIdx} className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      mcq.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      mcq.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {mcq.difficulty === 'easy' ? 'E' : mcq.difficulty === 'medium' ? 'M' : 'H'}
                    </span>
                    <h3 className="font-medium text-slate-800 dark:text-slate-200 flex-1">
                      {mcqIdx + 1}. {mcq.question}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {mcq.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleMCQSelect(selectedTopicIndex, mcqIdx, ['A', 'B', 'C', 'D'][optIdx])}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${getOptionClass(mcq, option, optIdx)}`}
                      >
                        <span className="font-medium mr-2">{['A', 'B', 'C', 'D'][optIdx]}.</span>
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  {mcq.showExplanation && (
                    <div className={`p-3 rounded-lg ${
                      mcq.selected === mcq.answer 
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {mcq.selected === mcq.answer ? (
                          <>
                            <span className="text-green-600 dark:text-green-400">✅</span>
                            <span className="font-medium text-green-800 dark:text-green-300">Correct!</span>
                          </>
                        ) : (
                          <>
                            <span className="text-red-600 dark:text-red-400">❌</span>
                            <span className="font-medium text-red-800 dark:text-red-300">Incorrect</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{mcq.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
            <span>👍</span>
            Helpful Brief
          </button>
          <button className="px-6 py-3 bg-slate-200 dark:bg-neutral-700 hover:bg-slate-300 dark:hover:bg-neutral-600 text-slate-800 dark:text-white rounded-xl font-medium transition-colors">
            Share with Friend
          </button>
        </div>

        {/* Loop Info */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <span className="text-xl">🤖</span>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <p className="font-medium text-slate-800 dark:text-slate-200 mb-1">About SkillLoop</p>
              <p>This brief was automatically generated at 5:00 AM by analyzing your syllabus progress and previous year question patterns. No human prompting required — the loop runs itself!</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Tokens used: {brief.loop_metadata.total_tokens_used} | Retries: {brief.loop_metadata.retries} | Topics discovered: {brief.loop_metadata.topics_discovered}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
