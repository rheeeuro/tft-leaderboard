import styled from "@emotion/styled";
import IronImg from "@/assets/iron.png";
import BronzeImg from "@/assets/bronze.png";
import SilverImg from "@/assets/silver.png";
import GoldImg from "@/assets/gold.png";
import PlatinumImg from "@/assets/platinum.png";
import EmeraldImg from "@/assets/emerald.png";
import DiamondImg from "@/assets/diamond.png";
import MasterImg from "@/assets/master.png";
import GrandmasterImg from "@/assets/grandmaster.png";
import ChallengerImg from "@/assets/challenger.png";

interface IProps {
  tier: tierType;
}

const TIER_IMG = {
  CHALLENGER: ChallengerImg,
  GRANDMASTER: GrandmasterImg,
  MASTER: MasterImg,
  DIAMOND: DiamondImg,
  EMERALD: EmeraldImg,
  PLATINUM: PlatinumImg,
  GOLD: GoldImg,
  SILVER: SilverImg,
  BRONZE: BronzeImg,
  ICON: IronImg,
};

type tierType = keyof typeof TIER_IMG;

function RankTierImg({ tier }: IProps) {
  return <Img src={TIER_IMG[tier]} />;
}

const Img = styled.img({
  width: "60px",
  height: "60px",
});

export default RankTierImg;
