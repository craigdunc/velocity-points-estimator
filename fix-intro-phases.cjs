const fs = require('fs');
const filePath = 'C:/Users/Japan/documents/claude code/velocity-estimator/src/screens/Dashboard.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the exact intro panel block
const startMarker = `              })() : isIntroState ? (
                <div className="w-full max-w-[1100px] mx-auto">
                  <div className="relative rounded-xl overflow-hidden border border-gray-200" style={{ height: '340px' }}>

                    {/* SVG background — fills the panel exactly */}
                    <img src={PanelBgd} alt="" className="absolute inset-0 w-full h-full" style={{ objectFit: 'fill' }} />

                    {/* Member card — top right */}
                    <div className="absolute top-5 right-6 hidden sm:flex flex-col justify-between w-[180px] h-[110px] rounded-xl p-4 text-white text-right"
                         style={{ background: 'linear-gradient(135deg, #7A1515 0%, #C90000 100%)' }}>
                      <div className="flex items-center justify-end gap-1.5 text-[11px] font-medium opacity-90">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        {slot?.memberNumber || '1227 062 631'}
                      </div>
                      <div>
                        <p className="text-[10px] text-white/70 mb-0.5">Member since 2024</p>
                        <p className="text-[28px] leading-none" style={{ fontWeight: 100 }}>Red</p>
                      </div>
                    </div>

                    {/* Lion — left, 254px tall, vertically centred */}
                    <div className="absolute" style={{ left: '28px', top: '50%', transform: 'translateY(-50%)' }}>
                      <img
                        src={LionImg}
                        alt=""
                        style={{
                          height: '254px',
                          width: 'auto',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.12))',
                        }}
                      />
                    </div>

                    {/* Text block — vertically centred, left edge clear of lion */}
                    <div className="absolute" style={{ left: '290px', right: '210px', top: '50%', transform: 'translateY(-50%)' }}>
                      <h2 className="text-[22px] font-bold text-[#1d1c1f] mb-2 leading-tight">
                        Welcome to the program, {slot?.name?.split(' ')[0] || 'Kim'}!
                      </h2>
                      <p className="text-[14px] text-[#575559] mb-5 min-h-[20px]">
                        <HTMLTypewriter html="I'd like to give you 100 pts as a welcome gift." speed={25} />
                      </p>
                      <button
                        onClick={(e) => { handleAcceptWelcome(e); setTimeout(() => goTo(3), 800); }}
                        className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors"
                      >
                        Accept 100 pts
                      </button>
                    </div>

                  </div>
                </div>
              ) : selectedWTEs.length === 0 ? (`;

const newBlock = `              })() : isIntroState ? (
                <div className="w-full max-w-[1100px] mx-auto">
                  <div className="relative rounded-xl overflow-hidden border border-gray-200" style={{ height: '340px' }}>

                    {/* SVG background */}
                    <img src={PanelBgd} alt="" className="absolute inset-0 w-full h-full" style={{ objectFit: 'fill' }} />

                    {/* Phase 0: member card top-right */}
                    {introPhase === 0 && (
                      <div className="absolute top-5 right-6 hidden sm:flex flex-col justify-between w-[180px] h-[110px] rounded-xl p-4 text-white text-right"
                           style={{ background: 'linear-gradient(135deg, #7A1515 0%, #C90000 100%)' }}>
                        <div className="flex items-center justify-end gap-1.5 text-[11px] font-medium opacity-90">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                          {slot?.memberNumber || '1227 062 631'}
                        </div>
                        <div>
                          <p className="text-[10px] text-white/70 mb-0.5">Member since 2024</p>
                          <p className="text-[28px] leading-none" style={{ fontWeight: 100 }}>Red</p>
                        </div>
                      </div>
                    )}

                    {/* Phases 1–5: Choose / Add / Set up cards on the right */}
                    {introPhase >= 1 && (
                      <div className="absolute right-8 hidden sm:flex items-end gap-4" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                        {[
                          { img: imgChoose, label: 'Choose', activeAt: 3 },
                          { img: imgAdd,    label: 'Add',    activeAt: 4 },
                          { img: imgSetup,  label: 'Set up', activeAt: 5 },
                        ].map(({ img, label, activeAt }) => {
                          const isActive = introPhase === activeAt;
                          const isPast   = introPhase > activeAt;
                          return (
                            <div key={label} className={`flex flex-col items-center transition-all duration-300 ${isPast ? 'opacity-40 grayscale' : ''}`}>
                              <div className={`w-[96px] h-[96px] rounded-[16px] flex items-center justify-center overflow-hidden mb-2 transition-all duration-300 ${isActive ? 'bg-white' : 'bg-[#F3F3F3]'}`}
                                   style={isActive ? { boxShadow: '0 0 0 2.5px #4C2F92, 0 4px_12px rgba(76,47,146,0.18)' } : {}}>
                                <img src={img} alt={label} className="w-full h-full object-cover" />
                              </div>
                              <span className={`text-[12px] font-semibold ${isActive ? 'text-[#4C2F92]' : 'text-[#aaaaaa]'}`}>{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Lion — left, 254px tall, vertically centred */}
                    <div className="absolute" style={{ left: '28px', top: '50%', transform: 'translateY(-50%)' }}>
                      <img src={LionImg} alt="" style={{ height: '254px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.12))' }} />
                    </div>

                    {/* Text block — shifts right edge depending on phase */}
                    <div className="absolute" style={{ left: '290px', right: introPhase === 0 ? '210px' : '355px', top: '50%', transform: 'translateY(-50%)' }}>

                      {introPhase === 0 ? (
                        <>
                          <h2 className="text-[22px] font-bold text-[#1d1c1f] mb-2 leading-tight">
                            Welcome to the program, {slot?.name?.split(' ')[0] || 'Kim'}!
                          </h2>
                          <p className="text-[14px] text-[#575559] mb-5 min-h-[20px]">
                            <HTMLTypewriter html="I'd like to give you 100 pts as a welcome gift." speed={25} />
                          </p>
                          <button
                            onClick={handleAcceptWelcome}
                            className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors"
                          >
                            Accept 100 pts
                          </button>
                        </>

                      ) : introPhase === 1 ? (
                        <>
                          <h2 className="text-[22px] font-bold text-[#1d1c1f] mb-2 leading-tight min-h-[30px]">
                            <HTMLTypewriter html="OK, 100 pts for you!" speed={40} onComplete={() => setHeadlineDone(true)} />
                          </h2>
                          <div className="min-h-[44px] mb-4">
                            {headlineDone && (
                              <p className="text-[14px] text-[#575559] leading-relaxed">
                                <HTMLTypewriter html="That's better. Starting from zero is no fun at all." speed={30} onComplete={() => setTypewriterDone(true)} />
                              </p>
                            )}
                          </div>
                          <div className={`flex items-center gap-5 ${typewriterDone ? 'animate-duo-entrance' : 'invisible'}`}>
                            <button
                              onClick={() => { setIntroPhase(2); setHeadlineDone(false); setTypewriterDone(false); }}
                              className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors"
                            >Thanks!</button>
                            <button onClick={() => setDashboardIntroDismissed(true)} className="text-[13px] text-[#4C2F92] font-medium hover:underline">Skip</button>
                          </div>
                        </>

                      ) : introPhase === 2 ? (
                        <>
                          <h2 className="text-[22px] font-bold text-[#1d1c1f] mb-2 leading-tight min-h-[30px]">
                            <HTMLTypewriter html="Let's get you some more points." speed={40} onComplete={() => setHeadlineDone(true)} />
                          </h2>
                          <div className="min-h-[56px] mb-4">
                            {headlineDone && (
                              <p className="text-[14px] text-[#575559] leading-relaxed">
                                <HTMLTypewriter html="One of the best ways to get the most out of your membership is by finding <strong>a few different ways</strong> of earning points.<br/>You can add some to this <strong>My Velocity</strong> page." speed={25} onComplete={() => setTypewriterDone(true)} />
                              </p>
                            )}
                          </div>
                          <div className={`flex items-center gap-5 ${typewriterDone ? 'animate-duo-entrance' : 'invisible'}`}>
                            <button
                              onClick={() => { setIntroPhase(3); setHeadlineDone(false); setTypewriterDone(false); }}
                              className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors"
                            >Show me!</button>
                            <button onClick={() => setDashboardIntroDismissed(true)} className="text-[13px] text-[#4C2F92] font-medium hover:underline">Skip</button>
                          </div>
                        </>

                      ) : introPhase === 3 ? (
                        <>
                          <h2 className="text-[22px] font-bold text-[#1d1c1f] mb-2 leading-tight min-h-[30px]">
                            <HTMLTypewriter html="Choose how you want to earn" speed={40} onComplete={() => setHeadlineDone(true)} />
                          </h2>
                          <div className="min-h-[56px] mb-4">
                            {headlineDone && (
                              <p className="text-[14px] text-[#575559] leading-relaxed">
                                <HTMLTypewriter html="You will see lots of <strong>different ways</strong> that you can earn. You can <strong>choose a few</strong> that look good initially. Don't worry, you can change these at any time!" speed={25} onComplete={() => setTypewriterDone(true)} />
                              </p>
                            )}
                          </div>
                          <div className={`flex items-center gap-5 ${typewriterDone ? 'animate-duo-entrance' : 'invisible'}`}>
                            <button
                              onClick={() => { setIntroPhase(4); setHeadlineDone(false); setTypewriterDone(false); }}
                              className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors"
                            >OK!</button>
                            <button onClick={() => setDashboardIntroDismissed(true)} className="text-[13px] text-[#4C2F92] font-medium hover:underline">Skip</button>
                          </div>
                        </>

                      ) : introPhase === 4 ? (
                        <>
                          <h2 className="text-[22px] font-bold text-[#1d1c1f] mb-2 leading-tight min-h-[30px]">
                            <HTMLTypewriter html="Add your favourite ways to earn" speed={40} onComplete={() => setHeadlineDone(true)} />
                          </h2>
                          <div className="min-h-[56px] mb-4">
                            {headlineDone && (
                              <p className="text-[14px] text-[#575559] leading-relaxed">
                                <HTMLTypewriter html="Adding these ways to earn to your list adds them as <strong>targets.</strong> This gives you a <strong>target number of points</strong> to aim for each month. Then you can imagine what kind of <strong>rewards</strong> you might want." speed={25} onComplete={() => setTypewriterDone(true)} />
                              </p>
                            )}
                          </div>
                          <div className={`flex items-center gap-5 ${typewriterDone ? 'animate-duo-entrance' : 'invisible'}`}>
                            <button
                              onClick={() => { setIntroPhase(5); setHeadlineDone(false); setTypewriterDone(false); }}
                              className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors"
                            >All right!</button>
                            <button onClick={() => setDashboardIntroDismissed(true)} className="text-[13px] text-[#4C2F92] font-medium hover:underline">Skip</button>
                          </div>
                        </>

                      ) : introPhase === 5 ? (
                        <>
                          <div className="min-h-[72px] mb-4">
                            <p className="text-[14px] text-[#575559] leading-relaxed">
                              <HTMLTypewriter html="Once you have some target ways to earn, they'll appear on this page — your <strong>My Velocity</strong> page. From here, you can start to learn more about them and I'll help you with <strong>next steps</strong> to set them up.<br/><br/>How does that sound?" speed={25} onComplete={() => setTypewriterDone(true)} />
                            </p>
                          </div>
                          <div className={`flex items-center gap-5 ${typewriterDone ? 'animate-duo-entrance' : 'invisible'}`}>
                            <button
                              onClick={() => { setDashboardIntroDismissed(true); goTo(3); }}
                              className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors"
                            >Sounds good</button>
                            <button onClick={() => setDashboardIntroDismissed(true)} className="text-[13px] text-[#4C2F92] font-medium hover:underline">Skip</button>
                          </div>
                        </>
                      ) : null}

                    </div>

                  </div>
                </div>
              ) : selectedWTEs.length === 0 ? (`;

if (!content.includes(startMarker)) { console.error('MARKER NOT FOUND'); process.exit(1); }
const newContent = content.replace(startMarker, newBlock);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Done — intro phases 0-5 wired');
