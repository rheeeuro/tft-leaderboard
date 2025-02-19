import { useEffect, useState } from "react";
import { getAccount } from "@/api/account";
import { getSummoner } from "@/api/summoner";
import { getLeague } from "@/api/league";
import { getVersion } from "@/api/version";
import { IPlayer, LeagueEntryDto, MatchDto, ParticipantDto } from "@/model";
import styled from "@emotion/styled";
import { VersionContext } from "@/contexts";
import PlayerRow from "@/components/PlayerRow";
import Toolbar from "@/components/Toolbar";
import { getMatch, getMatchIds } from "@/api/match";

// type SortType = "rank" | "name" | "update";
const RANK_QUEUE_TYPE = "RANKED_TFT";
const LOCAL_STORAGE_KEY = "tft-players";
const DEFAULT_TAG_LINE = "KR1";
const FETCH_DELAY = 2000;

function App() {
  const [version, setVersion] = useState<string>("15.3.1");
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    getVersion().then((latest) => setVersion(latest));
  }, []);

  useEffect(() => {
    const storageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageData && players.length === 0) {
      setPlayers(JSON.parse(storageData));
    }
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(players));
    }
  }, [players]);

  const addPlayer = async (gameName: string, tagLine: string) => {
    const newPlayer = await getPlayer(gameName, tagLine);
    if (!newPlayer) return;
    setPlayers((prev) => [...prev, newPlayer]);
  };

  const getPlayer = async (gameName: string, tagLine: string) => {
    try {
      const account = await getAccount({ gameName, tagLine });
      const summoner = await getSummoner({ puuid: account.puuid });
      const leagues = await getLeague({ summonerId: summoner.id });
      const league = filterLeague(leagues);

      if (!league) return;

      const matchIds = await getMatchIds({ puuid: summoner.puuid });
      console.log(matchIds);
      const matches = await Promise.all(
        matchIds.map((matchId) => getMatch({ matchId }))
      );
      const placements = matches.map((match: MatchDto) => {
        const participant = match.info.participants.find(
          (participant: ParticipantDto) => participant.puuid === summoner.puuid
        ) as ParticipantDto;
        return participant.placement;
      });

      return {
        gameName,
        tagLine,
        id: summoner.id,
        summoner,
        league,
        placements,
        updatedAt: Date.parse(new Date().toString()),
      };
    } catch (error) {
      alert(
        `${gameName}#${tagLine}을 추가하는데 오류가 발생했습니다. \n LOG: ${error}`
      );
    }
  };

  const filterLeague = (leagues: LeagueEntryDto[]) => {
    return leagues.find((league) => league.queueType === RANK_QUEUE_TYPE);
  };

  const wait = (timeToDelay: number) =>
    new Promise((resolve) => setTimeout(resolve, timeToDelay));

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputs = formData.get("player") as string;
    e.currentTarget.reset();
    for (const input of inputs.split(",")) {
      await handleInput(input);
      await wait(FETCH_DELAY);
    }
  };

  const handleInput = async (input: string) => {
    if (!input.includes("#")) {
      input += `#${DEFAULT_TAG_LINE}`;
    }
    const [gameName, tagLine] = input.split("#");
    await addPlayer(gameName, tagLine);
  };

  const refreshPlayer = (index: number) => {
    return async () => {
      const { gameName, tagLine } = players[index];
      const refreshedPlayer = await getPlayer(gameName, tagLine);
      if (!refreshedPlayer) return;
      const newPlayers = [...players];
      newPlayers[index] = refreshedPlayer;
      setPlayers(newPlayers);
    };
  };

  return (
    <VersionContext.Provider value={version}>
      <Container>
        <Toolbar handleSubmit={handleSubmit} />
        <ScrollContainer>
          {players.map((player, index) => (
            <PlayerRow
              key={player.id}
              player={player}
              refreshPlayer={refreshPlayer(index)}
            />
          ))}
        </ScrollContainer>
      </Container>
    </VersionContext.Provider>
  );
}

const Container = styled.div({
  width: "100%",
  height: "100%",
  maxWidth: "1300px",
  minWidth: "600px",
  borderRadius: "8px",
  boxShadow: "1px 1px 8px 1px rgba(101, 101, 101, 0.2)",
  backgroundColor: "#eee",
  display: "flex",
  flexDirection: "column",
});

const ScrollContainer = styled.div({
  padding: "50px",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  "@media (max-width: 1000px)": {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
  gap: "50px",
  height: "50px",
  flexGrow: 1,
  overFlowY: "scroll",
});

export default App;
// 쉬어,슈림프슈프림,중국집파스타,눈떠보니삼씹대#3098,윤재#1218,하악찡
