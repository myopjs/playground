import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams.ts";
import {useState, useEffect, useMemo, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import type {TeamMember} from '../data/teamMembers.ts';
import type {UserData} from "../data/mockUsers.ts";
import {Toast} from "./Toast.tsx";

interface HomePageProps {
    userData: UserData;
    members: TeamMember[];
    onUpdateMember: (updatedMember: Partial<TeamMember> & { id: string }) => void;
    onDeleteMember: (memberId: string) => void;
}

export const HomePage = ({userData, members, onUpdateMember, onDeleteMember}: HomePageProps) => {
    const navigate = useNavigate();

    const [view, setView] = useState('table')
    const [membersVersion, setMembersVersion] = useState(0)
    const [isTableReady, setIsTableReady] = useState(true)
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isProfileVisible, setIsProfileVisible] = useState(false)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const closeToast = useCallback(() => setToastOpen(false), [])

    const headerStats = useMemo(() => {
        const totalExperience = members.reduce((sum, m) => sum + parseFloat(m.experience), 0);
        const avgExperience = (totalExperience / members.length).toFixed(1);
        const allSkills = new Set(members.flatMap(m => m.skills));
        return {
            experience: { value: `${avgExperience} yrs`, label: 'Avg Experience' },
            members: { value: members.length, label: 'Members' },
            skills: { value: allSkills.size, label: 'Skills' },
            projects: { value: 23, label: 'Projects' }
        };
    }, [members]);

    useEffect(() => {
        if (selectedMember) {
            setIsProfileOpen(true);
            requestAnimationFrame(() => setIsProfileVisible(true));
        }
    }, [selectedMember]);

    // Debug: log when members state changes
    useEffect(() => {
        console.log('Members state updated, version:', membersVersion, 'first member:', members[0]?.name);
    }, [members, membersVersion]);

    // Force table remount when version changes
    useEffect(() => {
        if (membersVersion > 0) {
            setIsTableReady(false);
            const timer = setTimeout(() => setIsTableReady(true), 50);
            return () => clearTimeout(timer);
        }
    }, [membersVersion]);

    const closeProfile = () => {
        setIsProfileVisible(false);
        setTimeout(() => {
            setIsProfileOpen(false);
            setSelectedMember(null);
        }, 300);
    };

    const [headerInsightsAction, setHeaderInsightsAction] = useState<{ action: string } | null>(null);

    const handleHeaderInsightsCta = (action: string, payload: any) => {
        if (action === 'action_clicked') {
            if (payload?.action === 'viewHighlights') {
                navigate('/analytics');
            }
            if (payload?.action === 'addMember') {
                navigate('/add-member');
            }
            if (payload?.action === 'shareTeam') {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    setHeaderInsightsAction({ action: 'showShareCopied' });
                    setTimeout(() => setHeaderInsightsAction(null), 100);
                });
            }
        }
    };

    const handleCta = (action: string, payload: any) => {
        if (action === 'view-changed' && payload) {
            setView(payload.view);
        }
    };

    const handleMemberClick = (action: string, payload: any) => {
        if (action === 'member_clicked' && payload?.member) {
            setSelectedMember(payload.member);
        }
        if (action === 'addMember') {
            navigate('/add-member');
        }
    };

    const handleEditProfileCta = (action: string, payload: any) => {
        console.log('handleEditProfileCta called:', action, payload);
        if (action === 'close') {
            closeProfile();
        }
        if (action === 'delete' && payload?.profile) {
            const profileId = payload.profile.id;
            const profileName = payload.profile.name;
            console.log('Deleting member:', profileId);
            onDeleteMember(profileId);
            closeProfile();
            setMembersVersion(v => v + 1);
            setToastMessage(`${profileName} has been removed from the team`);
            setToastOpen(true);
        }
        if (action === 'save' && payload?.profile) {
            const updatedProfile = payload.profile;
            console.log('Updating members with:', updatedProfile);
            onUpdateMember({
                id: updatedProfile.id,
                name: updatedProfile.name,
                title: updatedProfile.title,
                initials: updatedProfile.initials,
                email: updatedProfile.email,
                phone: updatedProfile.phone,
                location: updatedProfile.location,
                skills: updatedProfile.skills,
                about: updatedProfile.about,
                experience: updatedProfile.experience,
                tenure: updatedProfile.tenure,
                profileImage: updatedProfile.profileImage,
            });
            setSelectedMember(prev => prev ? { ...prev, ...updatedProfile } : null);
            setMembersVersion(v => v + 1);
            console.log('State updates triggered');
        }
    };

    const mapMemberToProfile = (member: TeamMember) => {
        const teamSize = members.filter(m =>
            m.relationship.toLowerCase().includes(`reports to ${member.name.toLowerCase()}`)
        ).length;

        // Calculate tenure rank (1st = longest tenure)
        const sortedByTenure = [...members].sort((a, b) =>
            parseFloat(b.tenure) - parseFloat(a.tenure)
        );
        const tenureRank = sortedByTenure.findIndex(m => m.id === member.id) + 1;

        return {
            profile: {
                id: member.id,
                initials: member.initials,
                name: member.name,
                title: member.title,
                experience: member.experience,
                tenure: member.tenure,
                location: member.location,
                skills: member.skills,
                profileImage: member.profileImage,
                avatarColor: member.avatarColor,
                badge: member.role,
                email: member.email,
                phone: member.phone,
                about: member.about,
                relationship: member.relationship,
                relationshipType: member.relationshipType,
                teamSize,
                tenureRank,
            },
            isEditing: false
        };
    };

    return  <div className="homepage-container">
        {/* Header Insights */}
        <div className="homepage-header-insights">
            <MyopComponent
                componentId={getComponentId(QUERY_PARAMS.headerInsights)}
                data={{ userName: userData.name, stats: headerStats, ...headerInsightsAction }}
                on={handleHeaderInsightsCta as any}
            />
        </div>

        {/* Content Header */}
        <div className="homepage-content-header">
            <MyopComponent
                componentId={getComponentId(QUERY_PARAMS.tableHeader)}
                on={handleCta as any}
            />

        </div>
        <div className="homepage-content-area">
            {isTableReady && (
                view === 'table' ?
                    <MyopComponent key={`table-v${membersVersion}`} componentId={getComponentId(QUERY_PARAMS.table)} data={members} on={handleMemberClick as any} />:
                    <MyopComponent key={`cards-v${membersVersion}`} componentId={getComponentId(QUERY_PARAMS.cardsView)} data={members} on={handleMemberClick as any} />
            )}
        </div>

        {/* Edit Profile Modal */}
        {isProfileOpen && selectedMember && (
            <div
                className={`homepage-modal-overlay${isProfileVisible ? ' visible' : ''}`}
                onClick={closeProfile}
            >
                <div
                    className={`homepage-modal-panel${isProfileVisible ? ' visible' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <MyopComponent
                        componentId={getComponentId(QUERY_PARAMS.editProfile)}
                        data={mapMemberToProfile(selectedMember)}
                        on={handleEditProfileCta as any}
                    />
                </div>
            </div>
        )}

        <Toast
            message={toastMessage}
            isOpen={toastOpen}
            onClose={closeToast}
        />
    </div>
}
