import React from "react";

interface Props {
  userAddress: string | null;
  totalSupply: number;
  maxSupply: number;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  isUserInWhitelist: boolean;
  isSoldOut: boolean;
}

interface State {}

const defaultState: State = {};

export default class CollectionStatus extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private isSaleOpen(): boolean {
    return (
      (this.props.isWhitelistMintEnabled || !this.props.isPaused) &&
      !this.props.isSoldOut
    );
  }

  render() {
    return (
      <>
        <div className="flex flex-col justify-center items-center text-centers">
          <div className=" xl:absolute top-0 left-0  w-full space-y-2 flex flex-col xl:items-start xl:justify-start justify-center items-center text-center text-lg font-bold font-press text-[#6366f1] p-4 m-4">
            <div className="supply flex xl:flex-row flex-col xl:space-x-6 items-center">
              <div className="w-14">
                <img src="/build/images/3.svg" alt="" />
              </div>
              <span className="address">{this.props.userAddress}</span>
            </div>

            <div className="supply xl:flex xl:space-x-6 items-center">
              <div className="w-14">
                <img src="/build/images/2.svg" alt="" />
              </div>
              <div>
                {this.props.totalSupply}/{this.props.maxSupply}
              </div>
            </div>
          </div>
          <div className="current-sale font-press text-[#6366f1] text-center text-xl xl:text-2xl 2xl:text-3xl xl:mt-16 z-20 relative">
            <span className="label">Sale status </span>
            {this.isSaleOpen() ? (
              <>
                {this.props.isWhitelistMintEnabled ? "Whitelist only" : "Open"}
              </>
            ) : (
              "Closed"
            )}
          </div>
        </div>
      </>
    );
  }
}
