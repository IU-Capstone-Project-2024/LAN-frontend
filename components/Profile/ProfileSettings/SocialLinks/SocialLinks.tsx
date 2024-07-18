import React, {ChangeEvent, FC} from 'react';
import styles from "@/Styles/Profile/ProfileSettings/profileSettings.module.scss";
import Image from "next/image";
import {addSocialLink, removeSocialLink, updateSocialLink} from "@/Store/slices/profileSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/Store/store";


const SocialLinks: FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const handleSocialLinkChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(updateSocialLink({ index, link: e.target.value }));
  };

  const handleAddSocialLink = () => {
    dispatch(addSocialLink());
  };

  const handleRemoveSocialLink = (index: number) => {
    dispatch(removeSocialLink(index));
  };

  return (
      <div className={styles.label_soc_set}>
        <label>Соц. сети</label>
        {profile.socialLinks.map((link, index) => (
            <div key={index} className={styles['social-link']}>
              <input
                  type="text"
                  value={link}
                  onChange={(e) => handleSocialLinkChange(e, index)}
              />
              <button className={styles.delete_button} type="button" onClick={() => handleRemoveSocialLink(index)}>
                <Image src={'/trash.svg'} alt={'Trash'} width={20} height={20}/></button>
            </div>
        ))}
        <button className={styles.addButton} type="button" onClick={handleAddSocialLink}><Image
            src={'/add_new_social_media.svg'} alt={'Trash'} width={30} height={30}/></button>
      </div>
  );
};


export default SocialLinks;