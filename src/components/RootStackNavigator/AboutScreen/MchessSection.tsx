import React, { FC } from "react";
import { H1, H2, P } from "primitives";
import { Row } from "ui";
import { H3 } from "primitives/typography/H3";
import { Text, Colors } from "primitives";
import { Linking } from "react-native";

export const MchessSection: FC = () => {
  return (
    <>
      <Row style={{ alignItems: "center" }}>
        <H1 style={{ marginTop: 0 }}>About mchess</H1>
      </Row>

      <P>
        mchess.io, short for Meta-variant Chess, is a place to explore the weird and
        wonderful world of chess variants. The same classic game we know and love in a
        whole new context!
      </P>

      <H3>Creators</H3>
      <P>Emmanuel Isaac, Angus Leck, Angus Johnson, and Seb King</P>

      <H2>The Rules of Chess</H2>
      <P>
        Some of the rules of chess can be interpreted in different ways in the context of
        variants. Here are a few of our thoughts on the topic.
      </P>

      <H3>Check</H3>
      <P>
        Whats the core idea behind check? We believe that it’s about doing justice to
        interesting positions. Blundering a piece feels bad - almost game ruining. Without
        check its possible to blunder your king, which could cut countless good games
        short. Our interpretation of check makes it illegal to make any move that would
        give your opponent(s) a move that would leave you with no kings. If you want to
        put the king on the chopping block: uncheck the check checking checkbox.
      </P>

      <H3>Castling</H3>
      <P>
        On mchess, you can castle if you can move your king two steps towards one of your
        rooks, there are no pieces between your king and that rook, the rook can get to
        the square the king moves through, and neither piece has moved before.
      </P>

      <H3>Castling through or out of check</H3>
      <P>
        On mchess, check can be turned off. If check is off, should we be able to castle
        through &apos;check&apos;?
      </P>
      <P>
        We at mchess think castling is a lot like a pawn&apos;s double-step. These are
        both moves that we allow as a shortcut to make the game more fun, but we
        don&apos;t want these shortcuts to change the game too much. This is why we let
        pawns be captured in passing (by other pawns) if they&apos;ve just double-stepped,
        and we allow kings to be captured in passing (by any piece-type) if they&apos;ve
        just castled.
      </P>
      <P>
        We also allow the king to be captured if it attempts to castle to get out of
        check!
      </P>

      <H2>Credits, copyright, and disclaimers</H2>
      <P>
        Some of the intellectual property on this site is (we think) ours - we&apos;ve
        worked quite hard on it - and we intend to keep whatever rights we have.
      </P>
      <P>
        We don&apos;t promise this software works as described. Please report any bugs you
        notice, either through the form in the help menu, or by emailing
        mchess.contact@gmail.com.
      </P>
      <P>
        Our chess pieces were created by {creatorCreditLink} under creative commons
        license. They can be found {pieceCreditLink}.
      </P>
    </>
  );
};

const pieceCreditLink = (
  <Text
    style={{ color: Colors.INFO.toString() }}
    onPress={(): void => {
      Linking.openURL("https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces");
    }}
  >
    here
  </Text>
);

const creatorCreditLink = (
  <Text
    style={{ color: Colors.INFO.toString() }}
    onPress={(): void => {
      Linking.openURL("https://en.wikipedia.org/wiki/User:Cburnett");
    }}
  >
    User:Cburnett
  </Text>
);
