import React from "react"
import styled from "@emotion/styled"
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 80px 40px 80px 40px;
`
const LeftBlock = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  :focus {
    background-color: lightblue;
  }
`
const RightBlock = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid blue;
  background-color: ${(props) => props.focused && "papayawhip"};
  display: flex;
  justify-content: center;
  align-items: center;
`
const Left = styled.div`
  > div {
    margin-bottom: 15px;
  }
`
const Right = styled.div`
  position: sticky;
  position: -webkit-sticky;
  height: 400px;
  top: 80px;

  > div {
    margin-bottom: 4px;
  }
`
const Middle = styled.div`
  position: sticky;
  position: -webkit-sticky;
  height: 400px;
  top: 80px;
`
const isInViewport = (rect) =>
  rect.top >= 0 &&
  rect.left >= 0 &&
  rect.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
  rect.right <= (window.innerWidth || document.documentElement.clientWidth)

const blocks = [
  {
    name: "asdf",
  },
  { name: "fdsa" },
  { name: "qwer" },
  { name: "rjrjr" },
  { name: "ytreqw" },
  { name: "12341234" },
  { name: "fdsalkj" },
  { name: "mfmfmfmf" },
  { name: "42kj14k3j4" },
  { name: "m4456345" },
  { name: "mfa,sdfasdf" },
]
function App() {
  const [focus, setFocus] = React.useState(null)
  React.useEffect(() => {
    console.log("effect")
    if (focus) {
      const viewportCheckerOne = document.getElementById(
        `${focus}-viewport-one`
      )
      const viewportCheckerTwo = document.getElementById(
        `${focus}-viewport-two`
      )
      console.log({
        top: !isInViewport(viewportCheckerOne.getBoundingClientRect()),
        bottom: !isInViewport(viewportCheckerTwo.getBoundingClientRect()),
      })
      if (
        !isInViewport(viewportCheckerOne.getBoundingClientRect()) ||
        !isInViewport(viewportCheckerTwo.getBoundingClientRect())
      ) {
        window.scroll({
          left: 0,
          // now account for fixed header
          top: viewportCheckerOne.offsetTop - 30,
          behavior: "smooth",
        })
        document.getElementById(focus).focus({ preventScroll: true })
      } else {
        document.getElementById(focus).focus({ preventScroll: true })
      }
    }
  }, [focus])
  return (
    <Container>
      <Left>
        {blocks.map((block, index) => {
          return (
            <div key={block.name}>
              <div id={`${block.name}-${index}-viewport-one`} />
              <LeftBlock
                id={`${block.name}-${index}`}
                tabIndex="0"
                onBlur={() => setFocus(null)}
                onFocus={() => {
                  setFocus(`${block.name}-${index}`)
                }}
              >
                {block.name}-{index}
              </LeftBlock>
              <div id={`${block.name}-${index}-viewport-two`} />
            </div>
          )
        })}
      </Left>
      <Middle>{focus ?? "None"}</Middle>
      <Right>
        {blocks.map((block, index) => {
          return (
            <RightBlock
              focused={`${block.name}-${index}` === focus}
              onClick={() => setFocus(`${block.name}-${index}`)}
              key={block.name}
            >
              {block.name}
            </RightBlock>
          )
        })}
      </Right>
    </Container>
  )
}

export default App
