/**
 *
 */

import React, { useEffect } from 'react';
import { t } from 'ttag';

import useLink from '../hooks/link.js';
import { useSelector, useDispatch } from 'react-redux';
import { cdn } from '../../utils/utag.js';
import { FISH_TYPES } from '../../core/constants.js';
import { fetchProfile } from '../../store/actions/thunks.js';

const LogInButton = () => {
  const link = useLink();
  const dispatch = useDispatch();
  const name = useSelector((s) => s.user.name);
  const username = useSelector((s) => s.user.username);
  const avatar = useSelector((s) => s.user.avatar);
  const fishes = useSelector((s) => s.profile.fishes);
  const lastFetch = useSelector((s) => s.profile.lastFetch);

  useEffect(() => {
    if (username && (!lastFetch || !Array.isArray(fishes) || fishes.length === 0)) {
      dispatch(fetchProfile());
    }
  }, [username, lastFetch, fishes, dispatch]);

  if (username && name) {
    const topFishes = Array.isArray(fishes)
      ? [...fishes].sort((a, b) => b.size - a.size).slice(0, 3)
      : [];

    return (
      <div
        id="loginbutton"
        className="actionbuttons profilecard"
        onClick={() => link('USERAREA', { target: 'fullscreen' })}
        role="button"
        title={t`User Area`}
        tabIndex={-1}
      >
        <span className="pc-avatar">
          {avatar ? (
            <img src={avatar} alt="avatar" />
          ) : (
            <span className="pc-avatar-ph" />
          )}
        </span>
        <div className="pc-body">
          <div className="pc-title">
            <span className="pc-username">{username}</span>
            <span className="pc-name">{name}</span>
          </div>
          {!!topFishes.length && (
            <div className="pc-fishes">
              {topFishes.map(({ type, size, ts }) => {
                const { name: fishName } = FISH_TYPES[type] || { name: '' };
                const shortname = fishName.toLowerCase().split(' ').join('');
                const sizeText = size >= 10 ? size.toFixed(2) : size.toFixed(1);
                return (
                  <span
                    key={ts || `${shortname}-${size}`}
                    className="profilefish pc-pill"
                  >
                    <img
                      className={`profilefish-img ${shortname}`}
                      src={cdn`/phishes/thumb/${shortname}.webp`}
                      alt={fishName}
                    />
                    <span className="profilefish-size">{sizeText}</span>&nbsp;kg
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      id="loginbutton"
      className="actionbuttons"
      onClick={() => link('USERAREA', { target: 'fullscreen' })}
      role="button"
      title={t`User Area`}
      tabIndex={-1}
    >
      <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" style={{ verticalAlign: '-0.125em' }}>
        <path fill="currentColor" d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" transform="translate(-84 -1999)"/>
      </svg>
    </div>
  );
};

export default React.memo(LogInButton);
