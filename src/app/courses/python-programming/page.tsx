'use client';

import React from 'react';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import Link from 'next/link';
import { Star, CheckCircle, Award, Download, Calendar, BookOpen } from 'lucide-react';
import { jsPDF } from 'jspdf';

const weeks = [
  {
    number: 1,
    title: 'Object-Oriented Programming Deep Dive',
    modules: ['Module 1', 'Module 2'],
    topics: [
      { name: 'Classes & Objects revisited', details: 'Constructors, instance/class/static methods, __dunder__ methods (__str__, __repr__, __eq__, __lt__), operator overloading' },
      { name: 'Inheritance & Polymorphism', details: 'Single and multiple inheritance, MRO (Method Resolution Order), super(), abstract base classes with ABC, interface simulation' },
      { name: 'Encapsulation & Properties', details: '@property, @setter, @deleter, name mangling with double underscore, dataclasses, slots' },
      { name: 'Composition over Inheritance', details: 'Dependency injection pattern, mixins, protocol classes, designing extensible systems' },
    ],
    project: 'Build a bank account system with Account, SavingsAccount, and LoanAccount classes — demonstrating full OOP hierarchy with transactions and validation.',
  },
  {
    number: 2,
    title: 'Advanced Data Structures & Algorithms',
    modules: ['Module 3'],
    topics: [
      { name: 'Built-in Collections deep dive', details: 'collections module: deque, Counter, OrderedDict, defaultdict, namedtuple, ChainMap — with time-complexity analysis' },
      { name: 'Stacks, Queues & Linked Lists', details: 'Implementing from scratch, when to use each, real-world use cases in Python projects' },
      { name: 'Sorting & Searching', details: 'Timsort internals, binary search, merge sort, quicksort — analysing Big-O in Python context' },
      { name: 'Trees & Graphs (Practical)', details: 'Binary trees, BST, BFS/DFS traversal using dict-based adjacency lists, solving real graph problems' },
    ],
    project: 'Implement a contact book with O(log n) search using a BST and a recommendation engine using graph BFS.',
  },
  {
    number: 3,
    title: 'Functional Programming, Iterators & Generators',
    modules: ['Module 4'],
    topics: [
      { name: 'First-class functions & closures', details: 'Higher-order functions, closures and their use cases, nonlocal keyword, function factories' },
      { name: 'Decorators', details: 'Simple decorators, decorators with arguments, stacking decorators, class-based decorators, functools.wraps, real-world examples (timing, caching, auth)' },
      { name: 'Iterators & Generators', details: '__iter__, __next__, StopIteration, yield, yield from, generator expressions, lazy evaluation, memory efficiency' },
      { name: 'Functional tools', details: 'map, filter, reduce, zip, enumerate, itertools (chain, product, combinations, groupby), operator module' },
    ],
    project: 'Build a data pipeline using generators that processes a 1M-row CSV lazily — demonstrating memory-efficient streaming.',
  },
  {
    number: 4,
    title: 'File I/O, JSON, CSV & Data Formats',
    modules: ['Module 5'],
    topics: [
      { name: 'File system mastery', details: 'pathlib.Path, reading/writing text and binary files, context managers, tempfile, shutil for file operations' },
      { name: 'JSON & YAML', details: 'json module, custom encoders/decoders, handling nested structures, schema validation with pydantic basics' },
      { name: 'CSV & Excel', details: 'csv module (DictReader/DictWriter), openpyxl for Excel files, handling encoding issues, large file processing' },
      { name: 'Context managers', details: 'with statement internals, writing custom context managers with __enter__/__exit__ and contextlib.contextmanager' },
    ],
    project: 'Build an ETL pipeline that reads multiple CSV/JSON sources, cleans and merges data, and outputs structured Excel reports.',
  },
  {
    number: 5,
    title: 'REST APIs & Web Scraping',
    modules: ['Module 6'],
    topics: [
      { name: 'HTTP & requests library', details: 'GET/POST/PUT/DELETE, headers, authentication (API keys, Bearer tokens, OAuth2 basics), session management, timeouts, retries' },
      { name: 'Working with REST APIs', details: 'Consuming real public APIs (OpenWeather, GitHub), pagination patterns, rate limiting with backoff, error handling' },
      { name: 'Web Scraping with BeautifulSoup', details: 'HTML parsing, CSS selectors, navigating the DOM, handling dynamic pages, robots.txt etiquette' },
      { name: 'Async requests', details: 'httpx and asyncio basics for concurrent API calls, when async matters vs. threading' },
    ],
    project: 'Build a news aggregator that scrapes 3 sources, deduplicates, and serves results through a local Flask/FastAPI endpoint.',
  },
  {
    number: 6,
    title: 'Database Integration',
    modules: ['Module 7'],
    topics: [
      { name: 'SQLite & psycopg2', details: 'sqlite3 module, parameterised queries (preventing SQL injection), transactions, connection pooling with psycopg2' },
      { name: 'SQLAlchemy Core & ORM', details: 'Engine, session, declarative base, relationships (one-to-many, many-to-many), lazy vs. eager loading, migrations with Alembic' },
      { name: 'Query optimization', details: 'EXPLAIN ANALYZE, indexing strategies, N+1 query problem, bulk inserts, caching query results' },
      { name: 'NoSQL with pymongo', details: 'MongoDB basics, CRUD operations, aggregation pipelines, when SQL vs. NoSQL matters' },
    ],
    project: 'Build a task management API backed by PostgreSQL using SQLAlchemy ORM — with full CRUD, relationships, and Alembic migrations.',
  },
  {
    number: 7,
    title: 'Data Science Foundations',
    modules: ['Module 8', 'Module 9'],
    topics: [
      { name: 'NumPy', details: 'ndarray creation, broadcasting, vectorized operations, linear algebra basics, random module, performance vs. plain Python' },
      { name: 'Pandas', details: 'DataFrame and Series, reading data (CSV/JSON/SQL), indexing (.loc/.iloc), groupby, merge/join, pivot tables, handling NaN' },
      { name: 'Data Cleaning', details: 'Outlier detection, type coercion, string normalization, missing value strategies (imputation vs. dropping), duplicates' },
      { name: 'Visualization', details: 'Matplotlib subplots, styling, seaborn statistical plots (heatmap, pairplot, boxplot), Plotly for interactive charts' },
    ],
    project: 'End-to-end EDA on a real dataset (e.g., Pakistan e-commerce sales): clean → analyse → visualise → present 5 key insights.',
  },
  {
    number: 8,
    title: 'Web Development, Testing & Deployment',
    modules: ['Module 10', 'Module 11', 'Module 12'],
    topics: [
      { name: 'FastAPI', details: 'Path operations, Pydantic models, dependency injection, async endpoints, automatic OpenAPI docs, JWT authentication' },
      { name: 'Testing with pytest', details: 'Unit tests, fixtures, parametrize, mocking (unittest.mock), coverage reports, TDD workflow basics' },
      { name: 'Packaging & Virtual Environments', details: 'venv, pip, requirements.txt, pyproject.toml, building distributable packages with setuptools' },
      { name: 'Docker & Deployment', details: 'Dockerfile for Python apps, docker-compose for app + DB, deploying to a VPS with Nginx, environment variable management' },
    ],
    project: 'Capstone: Deploy a production-grade FastAPI app with PostgreSQL, full test suite (>80% coverage), Docker setup, and live URL.',
  },
];

const outcomes = [
  'Write production-quality OOP code with proper design patterns',
  'Choose the right data structure for any problem based on time/space complexity',
  'Build memory-efficient data pipelines using generators and iterators',
  'Consume and build REST APIs with error handling, rate limiting, and authentication',
  'Integrate with SQL and NoSQL databases using ORMs and raw queries',
  'Perform exploratory data analysis with Pandas, NumPy, and Matplotlib',
  'Build and deploy FastAPI applications with Docker and proper test coverage',
  'Write clean, testable code that passes code review in a professional environment',
];

export default function PythonProgrammingPage() {
  const downloadPDF = () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.setFontSize(20);
      pdf.setTextColor(34, 197, 94);
      pdf.text('Intermediate Python Programming', pageWidth / 2, 20, { align: 'center' });
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('8-Week, 12-Module Production-Ready Python Course', pageWidth / 2, 29, { align: 'center' });

      let yPos = 42;
      weeks.forEach((week) => {
        if (yPos > 255) { pdf.addPage(); yPos = 20; }
        pdf.setFontSize(13);
        pdf.setTextColor(34, 197, 94);
        pdf.text(`Week ${week.number}: ${week.title}`, 20, yPos);
        yPos += 7;
        pdf.setFontSize(10);
        pdf.setTextColor(60, 60, 60);
        week.topics.forEach((t) => {
          if (yPos > 275) { pdf.addPage(); yPos = 20; }
          pdf.setFontSize(11);
          pdf.setTextColor(40, 40, 40);
          pdf.text(`• ${t.name}`, 26, yPos);
          yPos += 6;
          pdf.setFontSize(9);
          pdf.setTextColor(80, 80, 80);
          const lines = pdf.splitTextToSize(t.details, pageWidth - 55);
          pdf.text(lines, 32, yPos);
          yPos += lines.length * 5 + 2;
        });
        if (yPos > 275) { pdf.addPage(); yPos = 20; }
        pdf.setFontSize(10);
        pdf.setTextColor(34, 90, 200);
        const pLines = pdf.splitTextToSize(`Project: ${week.project}`, pageWidth - 45);
        pdf.text(pLines, 26, yPos);
        yPos += pLines.length * 6 + 7;
      });

      pdf.save('intermediate-python-programming-course.pdf');
    } catch {
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <AnimatedPageWrapper>
      <section className="section py-8 md:py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            <div className="flex justify-between items-center mb-6 md:mb-8">
              <Link href="/courses" className="flex items-center text-accent font-medium hover:text-primary transition-colors text-sm md:text-base">
                ← Back to All Courses
              </Link>
              <button onClick={downloadPDF} className="flex items-center gap-1 md:gap-2 bg-primary-gradient text-white font-medium py-2 px-3 md:px-4 rounded-full hover:shadow-glow transition-all text-sm">
                <Download size={16} />
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>

            <div className="text-center mb-8 md:mb-12 px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4">
                Intermediate Python Programming
              </h1>
              <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto">
                8 weeks of production-ready Python — from advanced OOP and data structures to APIs, databases, data science, and Docker deployment
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 md:mb-12">
              <div className="lg:col-span-2">
                <div className="glass-card card h-full bg-card border border-default p-5 md:p-6 lg:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Course Overview</h2>
                  <p className="text-secondary mb-4">
                    This intermediate course assumes you already know Python basics (variables, loops, functions, basic data types).
                    It takes you from competent beginner to confident professional — covering the patterns, tools, and techniques that
                    distinguish Python developers who land jobs and freelance clients.
                  </p>
                  <p className="text-secondary mb-6 text-sm md:text-base">
                    <span className="font-semibold">Prerequisites:</span> Basic Python knowledge (variables, conditionals, loops, functions). No advanced background required.
                  </p>

                  <h3 className="text-lg md:text-xl font-bold text-primary mb-3">What You&apos;ll Learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {outcomes.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-secondary text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg md:text-xl font-bold text-primary mb-3">Who Should Attend</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Python beginners who have finished a basic course and want to go deeper',
                      'Developers from other languages (JS, PHP, Java) transitioning to Python',
                      'Data science students who need stronger programming foundations',
                      'Backend developers building APIs and data pipelines',
                      'Freelancers expanding their Python service offerings',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-secondary text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="glass-card card bg-card border border-default p-5 md:p-6 lg:p-8 h-full">
                <div className="flex justify-center mb-4 md:mb-6">
                  <div className="bg-primary-gradient rounded-xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                    <span className="text-white text-2xl md:text-3xl font-bold">PY</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  {[
                    { label: 'Duration', value: '8 Weeks' },
                    { label: 'Modules', value: '12 Modules' },
                    { label: 'Format', value: 'Online / Live' },
                    { label: 'Certificate', value: 'Available' },
                    { label: 'Level', value: 'Intermediate' },
                    { label: 'Projects', value: '8 Projects' },
                  ].map((item) => (
                    <div key={item.label} className="bg-card p-3 rounded-lg border border-default">
                      <h3 className="font-semibold text-accent text-xs md:text-sm">{item.label}</h3>
                      <p className="text-primary text-sm md:text-base">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-4 md:mb-6">
                  <h3 className="text-sm md:text-lg font-bold text-primary mb-2">Course Rating</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={i < 4 ? 'text-yellow-500' : 'text-secondary'} fill={i < 4 ? 'currentColor' : 'none'} size={16} />
                    ))}
                    <span className="ml-2 text-secondary text-xs md:text-sm">4.8 (120+ students)</span>
                  </div>
                </div>

                <a href="https://wa.me/923189532843" target="_blank" rel="noopener noreferrer"
                  className="w-full bg-primary-gradient text-white font-medium py-2.5 px-4 rounded-full hover:shadow-glow transition-all mb-3 inline-block text-center text-sm">
                  Enroll via WhatsApp
                </a>
                <button onClick={downloadPDF} className="w-full btn btn-secondary text-sm py-2.5">
                  Download Syllabus
                </button>
              </div>
            </div>

            {/* Curriculum */}
            <div className="glass-card card bg-card border border-default p-5 md:p-6 lg:p-8 mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">8-Week Curriculum</h2>
              <div className="space-y-6">
                {weeks.map((week) => (
                  <div key={week.number} className="border border-default rounded-xl p-4 md:p-6 bg-card">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-1 flex items-center">
                      <Calendar className="mr-2 text-accent" size={16} />
                      Week {week.number}: {week.title}
                    </h3>
                    <p className="text-accent text-xs mb-4">{week.modules.join(' + ')}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {week.topics.map((topic, i) => (
                        <div key={i} className="p-3 bg-surface border border-default rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen className="text-accent flex-shrink-0" size={13} />
                            <span className="font-semibold text-primary text-sm">{topic.name}</span>
                          </div>
                          <p className="text-secondary text-xs">{topic.details}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-surface border border-default rounded-lg">
                      <span className="font-semibold text-accent text-xs">Weekly Project: </span>
                      <span className="text-secondary text-xs">{week.project}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div className="glass-card card bg-card border border-default p-5 md:p-6 lg:p-8 mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">Course Outcomes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {outcomes.map((item, i) => (
                  <div key={i} className="flex items-start p-3 bg-card rounded-lg border border-default">
                    <Award className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                    <span className="text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-gradient rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-3">Write Python That Gets You Hired</h2>
              <p className="mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
                Move beyond tutorials. Build real projects, learn professional patterns, and graduate with a deployed capstone that demonstrates everything you know.
              </p>
              <a href="https://wa.me/923189532843" target="_blank" rel="noopener noreferrer"
                className="bg-white text-accent font-medium py-2.5 px-6 md:px-8 rounded-full hover:bg-card transition-colors inline-block text-sm">
                Contact via WhatsApp
              </a>
            </div>

          </div>
        </div>
      </section>
    </AnimatedPageWrapper>
  );
}
