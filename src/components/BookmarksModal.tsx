import { Modal, List, Avatar, Empty } from 'antd';
import { Character } from '../types';
import { useTranslation } from 'react-i18next';

interface BookmarksModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function BookmarksModal({ visible, onClose }: BookmarksModalProps) {
  const { t } = useTranslation();
  
  // Get bookmarks from localStorage
  const bookmarks: Character[] = JSON.parse(localStorage.getItem('bookmarkedCharacters') || '[]');

  return (
    <Modal
      title={t('your_bookmarks')}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {bookmarks.length === 0 ? (
        <Empty description={t('no_bookmarks_found')} />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={bookmarks}
          renderItem={(character) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={character.image} size="large" />}
                title={<a href={`/characters/${character.id}`}>{character.name}</a>}
                description={
                  <>
                    <div>{t(`species_${character.species.toLowerCase().replace(/ /g, '_')}`)}</div>
                    <div>{t(`status_${character.status.toLowerCase()}`)}</div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
}