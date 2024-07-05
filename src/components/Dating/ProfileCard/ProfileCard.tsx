import React, {useState} from 'react';
import { Profile } from '@/Store/slices/datingSlice';
import styles from '@/Styles/Dating/ProfileCard.module.scss';
import ProfileInfo from "@/components/UniversalComponents/ProfileInfo/ProfileInfo";
import ProfileHeader from "@/components/UniversalComponents/ProfileHeader/ProfileHeader";
import { useRouter } from 'next/navigation';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const [screenWidth] = useState<number>(0);
  const router = useRouter();
  const handleEditProfile = () => {
    router.push('/profile_settings');
  };

  const truncateLink = (link: string) => {
    if (screenWidth <= 393) {
      return link.length > 27 ? `${link.slice(0, 27)}...` : link;
    } else {
      return link.length > 35 ? `${link.slice(0, 35)}...` : link;
    }
  };

  return (
      <div className={styles.profileCard}>
        <ProfileHeader title=""
                       photos={profile.photos}
                       iconSrc="/filter.svg"
                       iconAlt="Фильтр"
                       onAction={handleEditProfile}
                       width_icon={30}
                       height_icon={30}
        />
        <ProfileInfo coLife={profile.coLife} socialLinks={profile.socialLinks} truncateLink={truncateLink} screenWidth={screenWidth} about={profile.about} interests={profile.interests} name={profile.name} age={profile.age} religion={profile.religion} />
      </div>
  );
};


export default ProfileCard;
