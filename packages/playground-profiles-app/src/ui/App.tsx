import { useState, useEffect, useCallback } from 'react'
import {MyopComponent, preloadComponents} from "@myop/react";
import { COMPONENTS_IDS } from '../utils/componentsIds';
import { getComponentId, QUERY_PARAMS } from '../utils/queryParams';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import {Analytics} from "./Analytics.tsx";
import {HomePage} from "./HomePage.tsx";
import {AddMember} from "./AddMember.tsx";
import {SideBar} from "./SideBar.tsx";
import {getRandomUser, type UserData} from "../data/mockUsers.ts";
import {teamMembersData, type TeamMember} from "../data/teamMembers.ts";

const SESSION_STORAGE_KEY = 'currentUser';

function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    const savedUser = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [donePreload, setDonePreload] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>(teamMembersData);
  const navigate = useNavigate();
  const location = useLocation();

  const activeNavItem = location.pathname === '/analytics' ? 'analytics' : 'home';

  const handleAddMember = useCallback((newMember: TeamMember) => {
    setMembers(prev => [...prev, newMember]);
  }, []);

  const handleUpdateMember = useCallback((updatedMember: Partial<TeamMember> & { id: string }) => {
    setMembers(prev => prev.map(member =>
      String(member.id) === String(updatedMember.id)
        ? { ...member, ...updatedMember }
        : member
    ));
  }, []);

  const handleDeleteMember = useCallback((memberId: string) => {
    setMembers(prev => prev.filter(member => String(member.id) !== String(memberId)));
  }, []);

    const handleSignIn = () => {
      const user = getRandomUser();
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      setCurrentUser(user);
    };

    const handleLogout = () => {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      setCurrentUser(null);
    };

    const handleNavigate = (navId: string) => {
        if (navId === 'home') {
            navigate('/');
        } else if (navId === 'analytics') {
            navigate('/analytics');
        }
    };

    useEffect(() => {
        preloadComponents(Object.values(COMPONENTS_IDS), 'production').then(() => setDonePreload(true));
    }, [])


    if(!donePreload) {
        return (<div/>)
    }

  if (!currentUser) {

    return (<div className="app-signup-container">
        <MyopComponent
          componentId={getComponentId(QUERY_PARAMS.signup)}
          on={(actionId: string) => {
            if (actionId === 'google_signin' || actionId === 'email_signin' ||
                actionId === 'google_signup' || actionId === 'email_signup') {
              handleSignIn()
            }
          }}
        />
      </div>
    )
  }

  return (<div className="app-layout">
          <aside className="app-sidebar">
             <SideBar userData={currentUser} activeNavItem={activeNavItem} onLogout={handleLogout} onNavigate={handleNavigate} />
          </aside>
          <main className="app-main">
              <Routes>
                  <Route path="/" element={<HomePage userData={currentUser} members={members} onUpdateMember={handleUpdateMember} onDeleteMember={handleDeleteMember} />} />
                  <Route path="/analytics" element={<Analytics members={members} />} />
                  <Route path="/add-member" element={<AddMember members={members} onAddMember={handleAddMember} />} />
              </Routes>
          </main>
      </div>
  )
}

export default App
