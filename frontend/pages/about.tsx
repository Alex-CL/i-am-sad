import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import parse from "html-react-parser";
import { AppButton, Layout } from "../components";
import { ButtonType } from "../models";

export default function About() {
  const router = useRouter();

  const faqContainer = {
    overflowY: "scroll",
    height: "80%",
  };

  const faqStyle = {
    textAlign: "justify",
    width: "95%",
    marginLeft: "20px",
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "space-around",
    height: "20%",
    marginTop: "20px",
  };

  return (
    <Layout>
      <Box sx={faqContainer}>
        {faqs.map((f: FAQ) => (
          <>
            <p style={faqStyle}>
              <b>{f.question}</b>
            </p>
            <p style={faqStyle}>{parse(f.answer)}</p>
          </>
        ))}
      </Box>
      <Box sx={buttonContainer}>
        <AppButton
          type={ButtonType.Secondary}
          label={"Go home"}
          handleClick={() => router.push("/")}
        />
      </Box>
    </Layout>
  );
}

type FAQ = {
  question: string;
  answer: string;
};

const faqs = [
  {
    question: "How this... App works?",
    answer:
      'The app is using <a href="https://github.com/aravindasiva/demotivational-quotes-api">this GraphQL API</a> to get random demotivation quotes. If you like one of them, you can mark it as favourite.',
  },
  {
    question: "It sounds... Sad?",
    answer: "Yes.",
  },
  {
    question: "But... Why?",
    answer: "It wasn't my first option.",
  },
  {
    question: "Really?",
    answer: "Yes.",
  },
  {
    question: "What did you think at first?",
    answer:
      "I wanted to use <a href='https://github.com/tcgdex/cards-database'>this other API</a>. Before you say something, let me be clear: no, I don't like Pokemon, but I <del>like</del> love board and card games, and it gave me an idea: create a little app to make card decks, following TCG rules. The API is really interesting, because it allows to retrieve a wide range of information about each card (summon cost, attacks, abilities, etc.). BUT, and it was a very huge \"but\", it needs authentication to retrieve images. And I couldn't find the way to authenticate requests (I know it must be using some type of JWT, but the docs didn't say anything). The app, then, would be only full text. And I did not like the idea. So, I preferred to choose another API and think another option.",
  },
  {
    question:
      'Then, you thought a "cool" idea, but you refuse to do it, and decided to make a weird app.',
    answer: "That's... A quick way to summarize it.",
  },
  {
    question:
      "Then, I can see sad/demotivating/gloomy quotes, select which I like, and later I can view them in other view. That's it?",
    answer: "Yes.",
  },
  {
    question: "I... I don't like it.",
    answer: "I know.",
  },
  {
    question: "This app... And this talk... It's too weird for me.",
    answer: "Yes, I know.",
  },
  {
    question:
      "At least, could you explain more things you would like to do with this app? If you had more time.",
    answer: `Sure. Here you have a (non complete) list:
			<ul>
				<li>Store quotes in lists (hence the two models in Python)</li>
				<li>Register users, and allow users to create their own lists</li>
				<li>Share lists between users (or maybe as a text message to share it through Twitter, Telegram, etc.)</li>
				<li>Add new quotes (on your own making, or not)</li>
				<li>Connect frontend with backend (that is, remove fixtures -.-)</li>
			</ul>
			`,
  },
];
