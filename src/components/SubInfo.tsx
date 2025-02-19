import styled from "@emotion/styled";

interface IProps {
  title: string;
  info: string;
}

export function SubInfo({ title, info }: IProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Info>{info}</Info>
    </Container>
  );
}

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Title = styled.h3({
  fontSize: "12px",
  fontWeight: 400,
  margin: 0,
  marginBottom: "5px",
});

const Info = styled.p({
  fontSize: "22px",
  fontWeight: 200,
  margin: 0,
});

export default SubInfo;
