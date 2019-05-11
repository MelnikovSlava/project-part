import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { RootStore } from '../../../../store/root-store';
import LabelCriteria from './label-criteria/LabelCriteria';

import './LabelList.less';


interface ILabelListProps {
  children: any;
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class LabelList extends React.Component<ILabelListProps, any> {
  public render() {
    const {
      children,
      rootStore: {
        filterStore: {
          selectedBlockchains,
          selectedCategories,
          selectedPlatforms,
          selectedTypes,
          selectedRank,
          selectedUsers,
          selectedVolume,
          query,
          toggleBlockchain,
          toggleCategory,
          togglePlatform,
          toggleType,
          toggleRange,
          toggleQuery,
          references: {
            blockchains,
            categories,
            platforms,
            types,
          },
        },
      },
    } = this.props;

    let content = [];

    if (selectedPlatforms.size > 0) {
      selectedPlatforms.forEach((platformId) => {
        const platform = platforms.find((plt) => plt.id === platformId);

        content.push(
          <LabelCriteria
            key={platform.slug + platform.id + platform.name}
            text={platform.name}
            onClose={() => togglePlatform(platform.id)} />);
      });
    }

    if (selectedCategories.size > 0) {
      selectedCategories.forEach((catId) => {
        const cat = categories.find((ct) => ct.id === catId);

        content.push(
          <LabelCriteria
            key={cat.slug + cat.id + cat.name}
            text={cat.name}
            onClose={() => toggleCategory(cat.id)} />);
      });
    }

    if (selectedTypes.size > 0) {
      selectedTypes.forEach((typeSlug, i) => {
        const type = types.find((tp) => tp === typeSlug);

        content.push(
          <LabelCriteria
            key={type + i.toString()}
            text={type}
            onClose={() => toggleType(type)} />);
      });
    }

    if (selectedBlockchains.size > 0) {
      selectedBlockchains.forEach((blchnId, i) => {
        const blchn = blockchains.find((bl) => bl.id === blchnId);

        content.push(
          <LabelCriteria
            key={blchn.slug + i.toString() + blchn.id}
            text={blchn.name}
            onClose={() => toggleBlockchain(blchn.id)} />);
      });
    }

    if (selectedRank) {
      content.push(
        <LabelCriteria
          key={'rank-key'}
          text={`Rank from ${selectedRank[0]} to ${selectedRank[1]}`}
          onClose={() => toggleRange(null, 'rank')} />);
    }

    if (selectedUsers) {
      content.push(
        <LabelCriteria
          key={'users-key'}
          text={`DAU from ${selectedUsers[0]} to ${selectedUsers[1]}`}
          onClose={() => toggleRange(null, 'users')} />);
    }

    if (selectedVolume) {
      content.push(
        <LabelCriteria
          key={'volume-key'}
          text={`Rank from ${selectedVolume[0]} to ${selectedVolume[1]}`}
          onClose={() => toggleRange(null, 'volume')} />);
    }

    if (query) {
      content.push(
        <LabelCriteria
          key={'query-key'}
          text={query}
          onClose={() => toggleQuery(null)} />);
    }

    return (
      <div className="label-list">
        {children}
        {content}
      </div>
    );
  }
}
