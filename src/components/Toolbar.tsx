import styled from "@emotion/styled";

interface IProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

function Toolbar({ handleSubmit }: IProps) {
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input type="text" name="player" autoComplete="off" />
      </form>
    </Container>
  );
}

const Container = styled.div({
  height: "2rem",
  borderBottom: "1px solid black",
  display: "flex",
  alignItems: "center",
  padding: "8px",
});

export default Toolbar;
