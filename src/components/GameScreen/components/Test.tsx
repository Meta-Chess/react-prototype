// import React, { useState, createContext, useContext } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import styled from "styled-components/native";
// import moment from "moment";
// import { SFC } from "primitives";

// class StateTest {
//   constructor(public isRed: boolean) {}

//   setIsRed(isRed: boolean, forceUpdate: () => void) {
//     this.isRed = isRed;
//     forceUpdate();
//   }
// }

// export const Context = createContext({ state: new StateTest(false) });

// const Test: SFC = () => {
//   const [state, setState] = useState(new StateTest(false));
//   const [thing, updateThing] = useState(false);
//   const forceUpdate = () => {
//     updateThing(!thing);
//   };

//   return (
//     <Context.Provider value={{ state }}>
//       <Container
//         style={{ backgroundColor: state.isRed ? "red" : "blue" }}
//         onPress={() => {
//           state.setIsRed(true, forceUpdate);
//         }}
//       >
//         <Child />
//       </Container>
//     </Context.Provider>
//   );
// };

// const Child: SFC = () => {
//   const { state } = useContext(Context);
//   return (
//     <SmallContainer
//       style={{ backgroundColor: state.isRed ? "green" : "yellow" }}
//     />
//   );
// };

// const SmallContainer = styled(View)`
//   padding: 8px 12px;
//   border-radius: 8px;
//   width: 200px;
//   height: 200px;
// `;

// const Container = styled(TouchableOpacity)`
//   padding: 8px 12px;
//   border-radius: 8px;
//   width: 400px;
//   height: 400px;
// `;

// export { Test };
