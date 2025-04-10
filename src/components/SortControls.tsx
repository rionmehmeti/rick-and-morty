import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

const { Option } = Select;

export default function SortControls({ onSort }: { onSort: (criteria: 'name' | 'origin') => void }) {
  const { t } = useTranslation();
  return (
    <div className="mb-4">
      <label className="mr-2">{t('sort_by')}:</label>
      <Select
        onChange={(value: 'name' | 'origin') => onSort(value)}
        className=""
        defaultValue="name"
      >
        <Option value="name">{t('name')}</Option>
        <Option value="origin">{t('origin')}</Option>
      </Select>
    </div>
  );
}
