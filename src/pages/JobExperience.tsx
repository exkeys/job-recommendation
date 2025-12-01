import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useState } from 'react';
import { jobCategories } from '../data/problems';
import { getJobImage } from '../data/jobImages';
import PageHeader from '../components/PageHeader';

export default function JobExperience() {
  const navigate = useNavigate();
  const { setSelectedJob } = useStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleJobSelect = (job: string) => {
    setSelectedJob(job);
    navigate('/problem-select');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <PageHeader onBack={handleBack} />

      <section className="pt-14 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-full text-xs uppercase tracking-[0.3em] text-slate-400">
            Job Experience
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-snug">
            관심있는 직군을 선택하고<br className="hidden md:block" /> 실제 업무 상황을 체험해보세요.
          </h1>
          <p className="text-xl text-slate-300">
            AI가 맞춤형 솔루션을 제시합니다.
          </p>
        </div>
      </section>

      <section id="job-experience-grid" className="pt-6 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {jobCategories.map((job, index) => (
              <button
                key={index}
                onClick={() => handleJobSelect(job.name)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative p-5 rounded-2xl border border-slate-800/60 hover:border-slate-600 transition-all duration-300 overflow-hidden text-left bg-slate-900/60 backdrop-blur-sm"
              >
                <div className="absolute inset-0">
                  <img
                    src={getJobImage(job.name)}
                    alt={job.name}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-85 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/70"></div>
                </div>

                <div className="relative z-10 flex flex-col">
                  <div className="w-10 h-10 bg-slate-800/70 border border-slate-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-slate-700 group-hover:scale-105 transition-all duration-300">
                    <i className={`${job.icon} text-slate-200 text-lg`}></i>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    {job.name}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <span>체험하기</span>
                    <i className={`ri-arrow-right-s-line transition-transform ${hoveredIndex === index ? 'translate-x-0.5' : ''}`}></i>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

