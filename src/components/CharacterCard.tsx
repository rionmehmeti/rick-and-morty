import { useTranslation } from 'react-i18next';
import { Badge, notification } from 'antd';
import { Character } from '../types';
import { useEffect, useState } from 'react';

export default function CharacterCard({ character }: { character: Character }) {
  const { t } = useTranslation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedCharacters') || '[]');
    setIsBookmarked(bookmarks.some((bookmark: Character) => bookmark.id === character.id));
  }, [character.id]);

  const showNotification = (isBookmarking: boolean) => {
    api.success({
      message: isBookmarking ? t('added_to_bookmarks') : t('removed_from_bookmarks'),
      description: isBookmarking 
        ? t('character_saved_to_your_bookmarks') 
        : t('character_removed_from_your_bookmarks'),
      placement: 'topRight',
      duration: 2,
    });
  };

  const toggleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarkedCharacters') || '[]');
    
    if (isBookmarked) {
      bookmarks = bookmarks.filter((bookmark: Character) => bookmark.id !== character.id);
    } else {
      bookmarks.push(character);
    }
    
    localStorage.setItem('bookmarkedCharacters', JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
    showNotification(!isBookmarked);
  };

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans' }}>
      {contextHolder}
      <Badge.Ribbon text={`${t(`status_${character.status.toLowerCase()}`)}`}>
        <div className="bg-blue-100hover:shadow-lg transition rounded-2xl border border-gray-300 shadow-lg overflow-hidden h-full">
          <div className="relative">
            <img src={character.image} alt={character.name} className="w-full h-48 object-cover" />
            <button 
              onClick={toggleBookmark}
              className="absolute top-2 left-2 p-2 bg-white/80 rounded-xl hover:bg-white transition"
              aria-label={isBookmarked ? t('remove_bookmark') : t('add_bookmark')}
            >
              {isBookmarked ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>

              )}
            </button>
          </div>
          <div className="p-3" style={{ fontFamily: 'Plus Jakarta Sans' }}> 
            <h2 className="text-lg font-semibold">{character.name}</h2>

            <div className='w-full h-px bg-gray-400 my-2'></div>

            <div className='space-y-0.5'>
              <div className='flex items-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 16 1.5 1.5"/><path d="m14 8-1.5-1.5"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m16.5 10.5 1 1"/><path d="m17 6-2.891-2.891"/><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="m20 9 .891.891"/><path d="M3.109 14.109 4 15"/><path d="m6.5 12.5 1 1"/><path d="m7 18 2.891 2.891"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/></svg>
                <span>
                  {t(`species_${character.species.toLowerCase().replace(/ /g, '_')}`)}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 20h4"/><path d="M12 16v6"/><path d="M17 2h4v4"/><path d="m21 2-5.46 5.46"/><circle cx="12" cy="11" r="5"/></svg>
                <span>
                  {t(`gender_${character.gender.toLowerCase()}`)}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>
                </span>
                <span>
                  {character.origin.name.toLowerCase() === 'unknown'
                    ? t('origin_unknown')
                    : character.origin.name}
                </span>
              </div>
            </div>                    
          </div>
        </div>
      </Badge.Ribbon>
    </div>
  );
}