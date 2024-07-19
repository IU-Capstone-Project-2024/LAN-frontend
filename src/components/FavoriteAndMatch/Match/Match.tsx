import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/Store/store';
import { setMatches } from '@/Store/slices/matchesSlice';
import styles from '@/Styles/FavoriteAndMatch/Match.module.scss'


const Matches: FC = () => {
    const dispatch = useDispatch();
    const matches = useSelector((state: RootState) => state.matches.matches);
  
    useEffect(() => {
      fetch('/data/matches.json')
        .then(response => response.json())
        .then(data => {
          dispatch(setMatches(data));
        });
    }, [dispatch]);

    if (!matches) {
        return <div>Loading...</div>;
      }
  
    return (
        <>
          <div className={styles.matchesContainer}>
            {matches.map((match) => (
                <div key={match.id} className={styles.matchItem}>
                  <img src={match.image} alt={match.name}/>
                  <p>{match.name}</p>
                </div>
            ))}
          </div>
          <span className={styles.line}></span>
        </>

    );
};

export default Matches;