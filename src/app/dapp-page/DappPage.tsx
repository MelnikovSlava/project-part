import * as classNames from 'classnames';
import * as dateFormat from 'dateformat';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withRouter } from 'react-router';

import { requestsConfig } from '../../../config/config';
import { getNetworkName } from '../../helpers/eth';
import { numToEth, trimNumber } from '../../helpers/utils';
import { ISmartcontracts } from '../../store/entities/common-entities';
import { Blockchain } from '../../store/entities/types';
import { RootStore } from '../../store/root-store';
import Category from '../common/category/Category';
import BlockchainIcon from '../ui-kit/blockchain-icon/BlockchainIcon';
import ErrorMessage from '../ui-kit/error-message/ErrorMessage';
import Loader from '../ui-kit/loader/Loader';
import PlatfromIcon from '../ui-kit/platform-icon/PlatformIcon';
import Text from '../ui-kit/text/Text';
import Title from '../ui-kit/title/Title';
import ContractList from './contract-list/ContractList';
import InfoWidget from './info-widget/InfoWidget';

import './DappPage.less';


interface IDappPageProps {
  rootStore?: RootStore;
}

interface IDappPageState { }

@inject('rootStore')
@withRouter
@observer
export default class DappPage extends React.Component<IDappPageProps, IDappPageState> {
  constructor(props) {
    super(props);

    this.getBlockchainsFromContracts = this.getBlockchainsFromContracts.bind(this);
  }

  private getBlockchainsFromContracts(smartcontacts: ISmartcontracts | ISmartcontracts[]): Set<Blockchain> {
    let scs: ISmartcontracts[] =
      Array.isArray(smartcontacts) ? smartcontacts : [smartcontacts];

    let blchns = new Set<Blockchain>();

    scs.forEach((scontract) => blchns.add(scontract.blockchain.slug));

    return blchns;
  }

  public componentWillMount() {
    const { rootStore: { dappPageStore } } = this.props;

    dappPageStore.fetchDapp();
  }


  public render() {
    const { rootStore: { dappPageStore: { dapp, error, isLoading } } } = this.props;

    if (!dapp) {
      return null;
    }

    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return <ErrorMessage text={error} />;
    }

    const { name, short_description, description, rank_points, updated_at,
      platforms, created_at, smartcontracts, stat, categories, icon } = dapp;

    // blockchains widget
    let blockchainIconElements;
    if (smartcontracts.length > 0) {
      const blchnList = this.getBlockchainsFromContracts(smartcontracts);
      blockchainIconElements = [];

      blchnList.forEach((blchnItem, i) => {
        blockchainIconElements.push(
          <BlockchainIcon key={blchnItem + i} className="widget-blchn" blockchain={blchnItem} />,
        );
      });
    } else {
      blockchainIconElements = <p>-</p>;
    }

    // platforms widget
    let platformIconElements;
    if (platforms.length > 0) {
      platformIconElements = [];

      platforms.forEach((platformItem, i) => {
        platformIconElements.push(
          <PlatfromIcon
            key={platformItem.slug + i}
            className="widget-platform"
            platform={platformItem.slug}
          />,
        );
      });
    } else {
      platformIconElements = <p>-</p>;
    }


    // network widget
    let networkElement;
    if (smartcontracts.length > 0) {
      networkElement = [];

      let set = new Set<string>();

      smartcontracts.forEach((scontractItem, i) => {
        const ntwkId = scontractItem.blockchain.slug === 'ethereum'
          ? getNetworkName(scontractItem.network_id.toString())
          : scontractItem.network_id;

        if (!set.has(ntwkId)) {
          set.add(ntwkId);

          networkElement.push(
            <Text key={scontractItem.address + i} style={{ fontSize: 15, fontFamily: 'Cera Pro 300' }}>
              {ntwkId}
            </Text>,
          );
        }
      });
    } else {
      networkElement = <p>-</p>;
    }

    // categories
    let catElement;
    if (categories.length > 0) {
      catElement = categories.map((cat, i) =>
        <Category key={i + cat.name} category={cat.name} className="widget-category" />);
    } else {
      catElement = <p>-</p>;
    }

    return (
      <div className="cn-dapp-page">
        <div className="header flex">
          <div className="header-container">
            <div className={classNames('img', {
              'no-img': icon === null,
            })} >
              {icon !== null &&
                <img
                  src={`${requestsConfig.BASE_URL}${icon['full']}`}
                  alt={`icon-${name}`} />}
            </div>
            <div className="info">
              <Title>{name}</Title>
              <Text>{short_description === '' ? '-' : short_description}</Text>
            </div>
          </div>
        </div>

        <div className="content flex">
          <div className="content-container flex-h">
            <section className="main">
              <p className="full-description">{description}</p>

              <div className="divider" />

              <div className="widget-container">
                <InfoWidget className="widget" title="Rank">
                  <Text style={{ fontSize: 35, lineHeight: '35px' }}>{rank_points}</Text>
                </InfoWidget>
                <InfoWidget className="widget" title="Platform">
                  {platformIconElements}
                </InfoWidget>
                <InfoWidget className="widget" title="Blockchain">
                  {blockchainIconElements}
                </InfoWidget>
                <InfoWidget className="widget" title="Category">
                  {catElement}
                </InfoWidget>
              </div>

              <div className="divider" />

              <div className="widget-container">
                <InfoWidget className="widget" title="Address 24h">
                  <Text style={{ fontSize: 35, lineHeight: '35px' }}>{trimNumber(stat.addresses_24h)}</Text>
                </InfoWidget>
                <InfoWidget className="widget" title="Address 7d">
                  <Text style={{ fontSize: 35, lineHeight: '35px' }}>{trimNumber(stat.addresses_7d)}</Text>
                </InfoWidget>
                <InfoWidget className="widget" title="Volume 24h">
                  <Text style={{ fontSize: 35, lineHeight: '35px' }}>{numToEth(stat.values_24h)}</Text>
                </InfoWidget>
                <InfoWidget className="widget" title="Volume 7d">
                  <Text style={{ fontSize: 35, lineHeight: '35px' }}>{numToEth(stat.values_7d)}</Text>
                </InfoWidget>
                <InfoWidget className="widget" title="Transaction 24h">
                  <Text style={{ fontSize: 35, lineHeight: '35px' }}>{trimNumber(stat.txs_24h)}</Text>
                </InfoWidget>
                <InfoWidget className="widget" title="Transaction 7d">
                  <Text style={{ fontSize: 35, lineHeight: '35px' }}>{trimNumber(stat.txs_7d)}</Text>
                </InfoWidget>
              </div>
              {/* <DappChart chartData={formatedChartData} /> */}
            </section>

            <aside className="aside">
              <div className="aside-info flex">

                <InfoWidget className="widget" title="Network">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {networkElement}
                  </div>
                </InfoWidget>

                <InfoWidget className="widget" title="Created">
                  <Text style={{ fontSize: 15, fontFamily: 'Cera Pro 300' }}>
                    {dateFormat(created_at, 'mmm d, yyyy')}
                  </Text>
                </InfoWidget>

                <InfoWidget className="widget" title="Updated">
                  <Text style={{ fontSize: 15, fontFamily: 'Cera Pro 300' }}>
                    {dateFormat(updated_at, 'mmm d, yyyy')}
                  </Text>
                </InfoWidget>
              </div>

              <ContractList contractList={smartcontracts} />
            </aside>
          </div>
        </div>
      </div>
    );
  }
}
