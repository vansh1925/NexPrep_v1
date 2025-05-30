import { motion } from 'framer-motion';
import { Book, Code2, Lightbulb, BookOpen, ExternalLink, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const PracticeResources = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const practiceCategories = [
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      icon: <Code2 className="w-6 h-6" />,
      questions: [
        {
          question: "Explain the difference between Array and LinkedList",
          answer: "Arrays are fixed-size, contiguous memory blocks with O(1) random access but O(n) insertions/deletions. LinkedLists are dynamic, non-contiguous with O(n) random access but O(1) insertions/deletions at known positions."
        },
        {
          question: "What is the time complexity of QuickSort?",
          answer: "Average case: O(n log n), Worst case: O(n²). The worst case occurs when the pivot selection results in highly unbalanced partitions."
        },
        {
          question: "Explain BFS vs DFS",
          answer: "BFS explores level by level, good for shortest path. DFS goes deep into one path before backtracking, good for cycle detection and topological sorting."
        }
      ]
    },
    {
      id: 'system-design',
      title: 'System Design',
      icon: <Lightbulb className="w-6 h-6" />,
      questions: [
        {
          question: "How would you design a URL shortening service?",
          answer: "Key components: URL mapping service, storage (SQL/NoSQL), cache layer (Redis), load balancer, and analytics tracking."
        },
        {
          question: "Explain the CAP theorem",
          answer: "In distributed systems, you can only guarantee two of: Consistency, Availability, and Partition Tolerance. Choose based on your system's requirements."
        }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: <Code2 className="w-6 h-6" />,
      questions: [
        {
          question: "Explain React's Virtual DOM",
          answer: "Virtual DOM is a lightweight copy of the actual DOM. React uses it to optimize rendering by comparing virtual DOM trees and updating only necessary parts."
        },
        {
          question: "What are React Hooks?",
          answer: "Hooks are functions that let you use state and lifecycle features in functional components. Examples: useState, useEffect, useContext."
        }
      ]
    }
  ];

  const resources = [
    {
      category: "Books",
      items: [
        {
          title: "Cracking the Coding Interview",
          author: "Gayle Laakmann McDowell",
          description: "Comprehensive guide for technical interviews",
          link: "https://www.crackingthecodinginterview.com/"
        },
        {
          title: "Clean Code",
          author: "Robert C. Martin",
          description: "Best practices for writing clean, maintainable code",
          link: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
        }
      ]
    },
    {
      category: "Online Courses",
      items: [
        {
          title: "Grokking the System Design Interview",
          description: "Learn system design patterns and best practices",
          link: "https://www.educative.io/courses/grokking-the-system-design-interview"
        },
        {
          title: "Frontend Masters",
          description: "Advanced frontend development courses",
          link: "https://frontendmasters.com/"
        }
      ]
    },
    {
      category: "Practice Platforms",
      items: [
        {
          title: "LeetCode",
          description: "Practice coding problems and prepare for technical interviews",
          link: "https://leetcode.com/"
        },
        {
          title: "HackerRank",
          description: "Practice coding challenges and participate in competitions",
          link: "https://www.hackerrank.com/"
        }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 py-12">
      <div className="container mx-auto px-4">
        {/* Practice Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Practice Questions</h1>
            <p className="text-lg text-neutral-600">
              Practice common interview questions across different domains
            </p>
          </motion.div>

          <div className="space-y-6">
            {practiceCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-primary-600">{category.icon}</span>
                    <h2 className="text-xl font-semibold text-neutral-900">{category.title}</h2>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-500 transition-transform ${
                      expandedCategory === category.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedCategory === category.id && (
                  <div className="px-6 py-4 border-t">
                    <div className="space-y-6">
                      {category.questions.map((item, index) => (
                        <div key={index} className="bg-neutral-50 rounded-lg p-4">
                          <h3 className="font-semibold text-neutral-900 mb-2">{item.question}</h3>
                          <p className="text-neutral-600">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Learning Resources</h1>
            <p className="text-lg text-neutral-600">
              Curated list of books, courses, and platforms to help you prepare
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-primary-600" />
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <a
                      key={itemIndex}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-neutral-900">{item.title}</h3>
                          {item.author && (
                            <p className="text-sm text-neutral-500 mt-1">by {item.author}</p>
                          )}
                          <p className="text-neutral-600 mt-2">{item.description}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-neutral-400" />
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PracticeResources; 