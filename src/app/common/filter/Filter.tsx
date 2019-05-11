import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../../store/root-store';
import ErrorMessage from '../../ui-kit/error-message/ErrorMessage';
import Loader from '../../ui-kit/loader/Loader';
import Title from '../../ui-kit/title/Title';
import CriteriaBlockchain from './criteria/criteria-blockchain/CriteriaBlockchain';
import CriteriaCategory from './criteria/criteria-category/CriteriaCategory';
import CriteriaPlatform from './criteria/criteria-platform/CriteriaPlatform';
import CriteriaRange from './criteria/criteria-range/CriteriaRange';
import CriteriaType from './criteria/criteria-type/CriteriaType';
import FilterInput from './filter-input/FilterInput';
import LabelList from './label-list/LabelList';

import './Filter.less';


interface IFilterProps {
  rootStore?: RootStore;
  page: 'dapp' | 'project';
}

@inject('rootStore')
@observer
export default class Filter extends React.Component<IFilterProps, any> {
  public componentWillMount() {
    const { rootStore: { filterStore: { fetchReferences, setCurrentPage } }, page } = this.props;

    fetchReferences();
    setCurrentPage(page);
  }

  public render() {
    const { rootStore: { filterStore: { isLoading, error, references } }, page } = this.props;

    let content;
    if (isLoading) {
      content = <Loader />;
    } else if (error) {
      content = <ErrorMessage text={error} />;
    } else {
      content = (
        <>
          <section className="c-filter-labels">
            <LabelList>
              <Title type="big">{page === 'dapp' ? 'Dapps' : 'All projects'}</Title>
            </LabelList>
          </section>

          <section className="c-filter-search">
            <FilterInput />
          </section>

          <section className="c-filter-items">
            <CriteriaPlatform />

            <CriteriaCategory />

            {page === 'project' && <CriteriaBlockchain />}

            {page === 'project' && <CriteriaType />}

            <CriteriaRange title="Rank" type="rank" range={[0, 1000]} />

            {page === 'dapp' &&
              <CriteriaRange title="Users" type="users" range={[0, 1000]} />}

            {page === 'dapp' &&
              <CriteriaRange title="Market volume" type="volume" range={[0, 1000]} />}
          </section>
        </>
      );
    }
    return (
      <div className="component-filter">
        {content}
      </div>
    );
  }
}

