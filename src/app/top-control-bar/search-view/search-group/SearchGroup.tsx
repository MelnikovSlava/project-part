import { inject } from 'mobx-react';
import * as React from 'react';
import { RootStore } from 'src/store/root-store';

import { DappModel } from '../../../../store/entities/dapp-entity';
import { ProjectModel } from '../../../../store/entities/project-entity';
import Text from '../../../ui-kit/text/Text';
import SearchItem from './search-item/SearchItem';

import './SearchGroup.less';


interface ISearchGroupProps {
    groupName: string;
    items: Map<DappModel.Id, DappModel.IDapp> | Map<ProjectModel.Id, ProjectModel.IProject>;
    query?: string;
    rootStore?: RootStore;
}

interface ISearchGroupState {
    countShow: number;
}

@inject('rootStore')
export default class SearchGroup extends React.Component<ISearchGroupProps, ISearchGroupState> {
    constructor(props) {
        super(props);

        this.state = {
            countShow: 4,
        };

        this.clickMore = this.clickMore.bind(this);
        this.goTo = this.goTo.bind(this);
    }

    private goTo(slug: string) {
        const { rootStore: { router, globalSearchStore: { closeSearchResults } } } = this.props;

        return () => {
            router.push(`/store/dapps/${slug}`);
            closeSearchResults(false);
        };
    }

    private clickMore() {
        const { countShow } = this.state;

        const newCount = countShow * 2;

        this.setState({ countShow: newCount });
    }

    public render() {
        const { countShow } = this.state;
        const { groupName, items } = this.props;

        const itemArr = [...items];

        let content = [];
        for (let i = 0; i < Math.min(itemArr.length, countShow); i++) {
            content.push(
                <SearchItem
                    onClick={groupName === 'Dapps' ? this.goTo(itemArr[i][1].slug) : null}
                    key={i}
                    item={itemArr[i][1]} />);
        }

        if (items.size > countShow) {
            content.push(
                <p onClick={this.clickMore}
                    key="uniq-more-results-key"
                    className="search-group-more">
                    More results</p>);
        }

        return (
            <div className="search-group">
                <Text className="search-group-name">{groupName}</Text>

                <div className="search-group-list">
                    {content}
                </div>
            </div>
        );
    }
}
