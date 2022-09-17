import { utils, BigNumber } from "ethers";
import React from "react";
import NetworkConfigInterface from "../../../../smart-contract/lib/NetworkConfigInterface";

interface Props {
  networkConfig: NetworkConfigInterface;
  maxSupply: number;
  totalSupply: number;
  tokenPrice: BigNumber;
  maxMintAmountPerTx: number;
  isPaused: boolean;
  loading: boolean;
  isWhitelistMintEnabled: boolean;
  isUserInWhitelist: boolean;
  mintTokens(mintAmount: number): Promise<void>;
  whitelistMintTokens(mintAmount: number): Promise<void>;
}

interface State {
  mintAmount: number;
}

interface State {
  mintCost: number;
}

const defaultState: State = {
  mintAmount: 1,
  mintCost: 0,
};

export default class MintWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private canMint(): boolean {
    return !this.props.isPaused || this.canWhitelistMint();
  }

  private canWhitelistMint(): boolean {
    return this.props.isWhitelistMintEnabled && this.props.isUserInWhitelist;
  }

  private incrementMintAmount(): void {
    this.setState({
      mintAmount: Math.min(
        this.props.maxMintAmountPerTx,
        this.state.mintAmount + 1
      ),
    });
  }

  private decrementMintAmount(): void {
    this.setState({
      mintAmount: Math.max(1, this.state.mintAmount - 1),
    });
  }
  private setToOne(): void {
    this.setState({
      mintAmount: 1,
      mintCost: 0,
    });
  }

  private setToTwo(): void {
    this.setState({
      mintAmount: 2,
      mintCost: 0.005,
    });
  }

  private setToThree(): void {
    this.setState({
      mintAmount: 3,
      mintCost: 0.01,
    });
  }

  private async mint(): Promise<void> {
    if (!this.props.isPaused) {
      await this.props.mintTokens(this.state.mintAmount);

      return;
    }

    await this.props.whitelistMintTokens(this.state.mintAmount);
  }

  render() {
    return (
      <>
        {this.canMint() ? (
          <div
            className={`mint-widget ${
              this.props.loading
                ? "animate-pulse saturate-0 pointer-events-none"
                : ""
            }`}
          >
            <div className="preview">
              <img src="/build/images/preview.png" alt="Collection preview" />
            </div>

            <div className="price">
              <strong>Total price:</strong> {this.state.mintCost}
            </div>
            <span className="mint-amount">{this.state.mintAmount}</span>
            <div className="controls flex justify-between">
              <button
                className="decrease"
                disabled={this.props.loading}
                onClick={() => this.setToOne()}
              >
                1
              </button>

              <button
                className="increase"
                disabled={this.props.loading}
                onClick={() => this.setToTwo()}
              >
                2
              </button>
              <button
                className="increase"
                disabled={this.props.loading}
                onClick={() => this.setToThree()}
              >
                3
              </button>

              <button
                className="primary"
                disabled={this.props.loading}
                onClick={() => this.mint()}
              >
                Mint
              </button>
            </div>
          </div>
        ) : (
          <div className="cannot-mint">
            <span className="emoji">⏳</span>
            {this.props.isWhitelistMintEnabled ? (
              <>
                You are not included in the <strong>whitelist</strong>.
              </>
            ) : (
              <>
                The contract is <strong>paused</strong>.
              </>
            )}
            <br />
            Please come back during the next sale!
          </div>
        )}
      </>
    );
  }
}
