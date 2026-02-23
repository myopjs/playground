import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams.ts";
import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import type {TeamMember} from '../data/teamMembers.ts';
import {getInitials, getRandomAvatarColor} from '../utils/helpers.ts';

interface AddMemberProps {
    members: TeamMember[];
    onAddMember: (member: TeamMember) => void;
    isMobileView: boolean;
}

export const AddMember = ({members, onAddMember, isMobileView}: AddMemberProps) => {
    const navigate = useNavigate();

    const managersList = useMemo(() => {
        return members
            .filter(m => m.role === 'Manager' || m.role === 'Senior Member')
            .map(m => ({ id: m.id, name: `${m.name} - ${m.title}` }));
    }, [members]);

    const handleAddProfileCta = (action: string, payload: any): void => {
        if (action === 'cancel' || action === 'back') {
            navigate({ pathname: '/', search: window.location.search });
        }
        if (action === 'submit' && payload?.formData) {
            const formData = payload.formData;
            const manager = members.find(m => String(m.id) === String(formData.reportsTo));
            const newMember: TeamMember = {
                id: crypto.randomUUID(),
                initials: getInitials(formData.fullName || ''),
                name: formData.fullName || '',
                title: formData.jobTitle || '',
                location: formData.location || '',
                tenure: `${formData.companyTenure || 0}y`,
                experience: `${formData.yearsExperience || 0}y`,
                skills: formData.skills || [],
                role: 'Team',
                avatarColor: getRandomAvatarColor(),
                profileImage: formData.profilePicture || null,
                email: formData.email || '',
                phone: formData.phone || '',
                about: '',
                relationship: manager ? `${formData.fullName} reports to ${manager.name}` : '',
                relationshipType: 'Team member'
            };
            onAddMember(newMember);
            console.log('new member was added: ', newMember);
            navigate({ pathname: '/', search: window.location.search });
        }
    };

    return (
        <div className="add-member-container">
            <MyopComponent
                componentId={getComponentId(QUERY_PARAMS.addProfile)}
                data={{ managersList, isMobileView }}
                on={handleAddProfileCta}
            />
        </div>
    );
};