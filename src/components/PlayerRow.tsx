import { VersionContext } from "@/contexts";
import { IPlayer } from "@/model";
import { getElapsedTime, getSummonerIconUrl } from "@/utils";
import { useContext } from "react";
import styled from "@emotion/styled";
import RankTierImg from "./RankTierImg";
import SubInfo from "./SubInfo";

interface IProps {
  player: IPlayer;
  refreshPlayer: () => void;
}

const TIER_COLOR = {
  CHALLENGER: "gold",
  GRANDMASTER: "red",
  MASTER: "purple",
  DIAMOND: "blue",
  EMERALD: "green",
  PLATINUM: "skyblue",
  GOLD: "gold",
  SILVER: "gray",
  BRONZE: "yellow",
  ICON: "brown",
};

const PLACEMENT_COLOR = [
  "#26B170",
  ...Array(3).fill("#009DD1"),
  ...Array(4).fill("#B0A8A7"),
];

type tierType = keyof typeof TIER_COLOR;

function PlayerRow({ player, refreshPlayer }: IProps) {
  const {
    gameName,
    tagLine,
    updatedAt,
    placements,
    summoner: { profileIconId, summonerLevel },
    league: { tier, rank, leaguePoints, wins, losses },
  } = player;
  const version = useContext(VersionContext);

  const formatTierString = (upper: string) =>
    String(upper).charAt(0) + String(upper).slice(1).toLowerCase();

  const calcPlacement = () => {
    const sum = placements.reduce((acc, cur) => acc + cur, 0);
    const defense = placements.filter((placement) => placement <= 4);
    const average = (sum / 10).toFixed(1);
    const defenseRate = defense.length * 10;
    return { average, defenseRate };
  };

  return (
    <Container>
      <RowContainer>
        <AvatarContainer>
          <Avatar src={getSummonerIconUrl(version, profileIconId)} />
          <LevelContainer>
            <LevelText>{summonerLevel}</LevelText>
          </LevelContainer>
        </AvatarContainer>
        <InfoContainer>
          <NameTag>
            {gameName}
            <Tag>{`#${tagLine}`}</Tag>
          </NameTag>
          <TierContainer>
            <RankTierImg tier={tier as tierType} />
            <TierText color={TIER_COLOR[tier as tierType]}>
              {`${formatTierString(tier)} ${rank}`}{" "}
              <LeaguePoint>{`${leaguePoints} LP`}</LeaguePoint>
              <RecordText>{getElapsedTime(updatedAt)}</RecordText>
            </TierText>
          </TierContainer>
        </InfoContainer>
        <RefreshButton onClick={refreshPlayer}>↻</RefreshButton>
      </RowContainer>
      <RowContainer>
        <SubInfo title={"게임 수"} info={`${wins + losses}`} />
        <SubInfo title={"평균 순위"} info={`# ${calcPlacement().average}`} />
        <SubInfo title={"순방 확률"} info={`${calcPlacement().defenseRate}%`} />
        <PlacementGrid>
          {placements.map((placement, index) => (
            <Placement key={index} placement={placement}>
              {placement}
            </Placement>
          ))}
        </PlacementGrid>
      </RowContainer>
    </Container>
  );
}

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "30px",
  border: "1px solid black",
  borderRadius: "8px",
});

const RowContainer = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  "&:not(:last-of-type)": {
    marginBottom: "20px",
  },
});

const AvatarContainer = styled.div({
  width: "6rem",
  height: "6rem",
  aspectRatio: "1 / 1",
  borderRadius: "50%",
  overflow: "hidden",
  position: "relative",
  marginRight: "15px",
});

const Avatar = styled.img({
  width: "100%",
  height: "100%",
});

const LevelContainer = styled.div({
  position: "absolute",
  bottom: "0px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "2rem",
  borderRadius: "8px",
  backgroundColor: "#333",
  border: "2px solid #7e8236",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LevelText = styled.p({
  margin: 0,
  color: "#fff",
  fontSize: "12px",
});

const InfoContainer = styled.div({
  flexGrow: 1,
  padding: "0px 16px",
});

const NameTag = styled.h1({
  fontSize: "18px",
  marginBottom: "12px",
});

const Tag = styled.span({
  color: "#aaa",
  fontWeight: 400,
  marginLeft: "5px",
  fontSize: "14px",
});

const TierContainer = styled.div({
  display: "flex",
  alignItems: "center",
});

const TierText = styled.h4<{ color: string }>((props) => ({
  margin: 0,
  marginLeft: "15px",
  paddingTop: "5px",
  fontWeight: 400,
  color: props.color,
}));

const LeaguePoint = styled.span({
  color: "#333333",
  marginRight: "15px",
});

const RecordText = styled.span({
  margin: 0,
  color: "#b2b2b2",
  fontSize: "12px",
});

const PlacementGrid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1.5rem)",
  gridTemplateRows: "1.5rem 1.5rem",
  gap: "2px",
  marginRight: "10px",
});

const Placement = styled.div<{ placement: number }>((props) => ({
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: "4px",
  backgroundColor: PLACEMENT_COLOR[props.placement - 1] + "bb",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "14px",
}));

const RefreshButton = styled.button({
  width: "1.5rem",
  height: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5rem",
  border: "none",
});

export default PlayerRow;
