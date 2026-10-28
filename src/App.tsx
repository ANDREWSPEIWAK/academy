import { useEffect, useState } from 'react'
import { actions, useStore } from './store'
import Path from './sections/Path'
import Ttk from './sections/Ttk'
import Tests from './sections/Tests'
import Shift from './sections/Shift'
import Discipline from './sections/Discipline'
import Library from './sections/Library'
import Wheel from './sections/Wheel'
import Profile from './sections/Profile'

type Tab = 'path' | 'methodiki' | 'tests' | 'shift' | 'profile'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'path', label: 'Путь', icon: 'route' },
  { id: 'methodiki', label: 'Методики', icon: 'book' },
  { id: 'tests', label: 'Тесты', icon: 'check' },
  { id: 'shift', label: 'Смена', icon: 'clock' },
  { id: 'profile', label: 'Профиль', icon: 'user' },
]

function Icon({ name, active }: { name: string; active: boolean }) {
  const color = active ? '#111111' : '#111111'
  if (name === 'route') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="5" r="2" />
        <path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7H6" />
      </svg>
    )
  }
  if (name === 'book') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    )
  }
  if (name === 'check') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
  if (name === 'clock') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    )
  }
  if (name === 'user') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
      </svg>
    )
  }
  return null
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.8" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export default function App() {
  const s = useStore()
  const [tab, setTab] = useState<Tab>('path')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showTtk, setShowTtk] = useState(false)
  const [showDiscipline, setShowDiscipline] = useState(false)
  const [showWheel, setShowWheel] = useState(false)

  useEffect(() => {
    actions.dayOpened()
  }, [])

  const goTab = (t: Tab) => {
    setTab(t)
    setShowTtk(false)
    setShowDiscipline(false)
    setShowWheel(false)
    window.scrollTo({ top: 0 })
  }

  const openDrawerItem = (type: 'discipline' | 'wheel' | 'ttk') => {
    setDrawerOpen(false)
    if (type === 'discipline') { setShowDiscipline(true); setShowWheel(false); setShowTtk(false); setTab('path'); }
    if (type === 'wheel') { setShowWheel(true); setShowDiscipline(false); setShowTtk(false); setTab('path'); }
    if (type === 'ttk') { setShowTtk(true); setShowDiscipline(false); setShowWheel(false); setTab('path'); }
    window.scrollTo({ top: 0 })
  }

  const showBottomActive = tab === 'path' || tab === 'methodiki' || tab === 'tests' || tab === 'shift' || tab === 'profile'
  const bottomActiveId = showTtk || showDiscipline || showWheel ? null : tab

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F10' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 20px calc(8px + env(safe-area-inset-top, 0px)) 20px',
          marginTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Меню"
          className="press-anim"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#1B1B1D',
            border: '1px solid #2A2A2D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MenuIcon />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="./logo-202.png" alt="202F" style={{ width: 34, height: 34, borderRadius: 10 }} />
          <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, textTransform: 'uppercase', fontSize: 14, letterSpacing: 0 }}>
            <span style={{ color: '#FDC55E' }}>202F</span> <span style={{ color: '#FFFFFF' }}>ACADEMY</span>
          </div>
        </div>
        <button
          onClick={() => goTab('profile')}
          aria-label="Профиль"
          className="press-anim"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#5B3FF0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <UserIcon />
        </button>
      </header>

      <main
        style={{
          maxWidth: 480,
          margin: '0 auto',
          padding: '8px 20px calc(96px + env(safe-area-inset-bottom, 0px)) 20px',
        }}
      >
        {showDiscipline && <Discipline />}
        {showWheel && <Wheel />}
        {showTtk && <Ttk />}
        {!showDiscipline && !showWheel && !showTtk && tab === 'path' && <Path />}
        {!showDiscipline && !showWheel && !showTtk && tab === 'methodiki' && <Library />}
        {!showDiscipline && !showWheel && !showTtk && tab === 'tests' && <Tests />}
        {!showDiscipline && !showWheel && !showTtk && tab === 'shift' && <Shift />}
        {!showDiscipline && !showWheel && !showTtk && tab === 'profile' && <Profile />}
      </main>

      {showBottomActive && (
        <nav
          style={{
            position: 'fixed',
            left: 20,
            right: 20,
            bottom: `calc(24px + env(safe-area-inset-bottom, 0px))`,
            height: 64,
            background: '#E8E6DF',
            borderRadius: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            zIndex: 40,
          }}
        >
          {tabs.map((t) => {
            const active = bottomActiveId === t.id
            return (
              <button
                key={t.id}
                onClick={() => goTab(t.id)}
                aria-label={t.label}
                className="press-anim"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: active ? '#111111' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                }}
              >
                <Icon name={t.icon} active={active} />
              </button>
            )
          })}
        </nav>
      )}

      {drawerOpen && (
        <div className="fade-anim" style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
          <div
            onClick={() => setDrawerOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
          />
          <aside
            className="drawer-anim"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 300,
              background: '#E8E6DF',
              borderRadius: '0 32px 32px 0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="./logo-202.png" alt="202F" style={{ width: 44, height: 44, borderRadius: 10 }} />
                <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800, textTransform: 'uppercase', fontSize: 14 }}>
                  <span style={{ color: '#5B3FF0' }}>202F</span> <span style={{ color: '#111111' }}>ACADEMY</span>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Закрыть"
                className="press-anim"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1px solid #CFCCC4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { label: 'Дисциплина', icon: 'check', action: () => openDrawerItem('discipline') },
                { label: 'Вкусы', icon: 'flavor', action: () => openDrawerItem('wheel') },
                { label: 'Техкарты', icon: 'doc', action: () => openDrawerItem('ttk') },
                { label: 'Язык', icon: 'lang', action: () => {} },
                { label: 'Настройки', icon: 'gear', action: () => {} },
              ].map((item, idx) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="press-anim"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '0 20px',
                    height: 56,
                    background: 'transparent',
                    border: 'none',
                    borderTop: idx === 0 ? 'none' : '1px solid #CFCCC4',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#111111',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon === 'check' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9D98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                    {item.icon === 'flavor' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9D98A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                      </svg>
                    )}
                    {item.icon === 'doc' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9D98A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                      </svg>
                    )}
                    {item.icon === 'lang' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9D98A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        <path d="M2 12h20" />
                      </svg>
                    )}
                    {item.icon === 'gear' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9D98A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    )}
                  </div>
                  <span style={{ flex: 1, fontFamily: "'Unbounded', sans-serif", fontWeight: 800, textTransform: 'uppercase', fontSize: 14, color: '#111111' }}>
                    {item.label}
                  </span>
                  <ChevronRight />
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </div>
  )
}
