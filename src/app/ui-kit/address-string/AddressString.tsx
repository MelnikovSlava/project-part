import * as React from 'react';

import './AddressString.less';


interface IAddressStringProps {
  str: string;
  endCharNumber?: number;
  className?: string;
}

export default class AddressString extends React.PureComponent<IAddressStringProps, {}> {
  public render() {
    const { className = '', str, endCharNumber = 6 } = this.props;

    if (endCharNumber === 0) {
      return (
        <div className={`address-string flex-v ${className}`}>
          <p className="text text-ellipsis">{str}</p>
        </div>
      );
    }

    if (str.length > endCharNumber) {
      const lastChars = str.slice(-endCharNumber);
      const otherChars = str.slice(0, -endCharNumber);

      return (
        <div className={`address-string flex-v ${className}`}>
          <p className="text text-ellipsis">{otherChars}</p>
          <p className="text">{lastChars}</p>
        </div>
      );
    } else {
      return <p>{str}</p>;
    }
  }
}
