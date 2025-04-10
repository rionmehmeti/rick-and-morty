import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse, Select, Button } from 'antd';

const { Option } = Select;

interface FiltersProps {
  onChange: (filters: { status: string; species: string }) => void;
}

function SideFilters({ onChange }: FiltersProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const lastAppliedFilters = useRef({ status: '', species: '' });

  const filtersChanged =
    status !== lastAppliedFilters.current.status ||
    species !== lastAppliedFilters.current.species;

  const apply = () => {
    const filters = { status, species };
    onChange(filters);
    lastAppliedFilters.current = filters;
  };

  const items = [
    {
      key: '1',
      label: t('Filters'),
      children: (
        <>
            <div>Status:</div>
            <Select
                defaultValue="{{t('all_status')}}"
                value={status}
                onChange={(value) => setStatus(value)}
                className="w-full mt-1"
                placeholder={t('all_status')}
                allowClear
            >   
                <Option value="">{t('all_status')}</Option>
                <Option value="Alive">Alive</Option>
                <Option value="Dead">Dead</Option>
                <Option value="unknown">Unknown</Option>
            </Select>

            <div className="mt-2">Species:</div>
            <Select
                defaultValue="{t('all_species')}"
                value={species}
                onChange={(value) => setSpecies(value)}
                className="w-full mt-1"
                placeholder={t('all_species')}
                allowClear
            >
                <Option value="">{t('all_species')}</Option>
                <Option value="Human">{t('species_human')}</Option>
                <Option value="Alien">{t('species_alien')}</Option>
                <Option value="Robot">{t('species_robot')}</Option>
                <Option value="Animal">{t('species_animal')}</Option>
                <Option value="Mythological Creature">{t('species_mythological')}</Option>
                <Option value="unknown">{t('species_unknown')}</Option>
            </Select>
        </>
      ),
    }
  ];

  return (
    <>
      <Collapse
        style={{ fontFamily: 'Plus Jakarta Sans' }}
        items={items}
        defaultActiveKey={['1']}
      />
      <Button 
        onClick={apply}
        disabled={!filtersChanged}
        type="primary"
        block
        className="mt-3"
      >
        {t('apply')}
      </Button>
    </>
  );
}

export default SideFilters;
