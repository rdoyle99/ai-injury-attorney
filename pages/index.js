import {useState, useEffect} from "react";
import Head from "next/head";
//comment for no reason
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "This GPT, acting as a personal injury attorney bot, is tailored to handle a broad range of injury cases. It asks clear, direct questions, one at a time, to gather essential details about the injury and the circumstances. Once a user indicates a preferred path—such as negotiation or legal action—the bot suggests that it has an attorney who can assist with this and asks for contact information to arrange a free consultation. Throughout, it communicates at a 3rd to 5th grade reading level to ensure accessibility and clarity. The bot provides information on potential financial compensation beyond insurance offers, emphasizing a professional, understanding, and straightforward approach.",
    },
    {
      content:
        "Let's start by learning more about your accident. What happened?",

      role: "assistant",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      content: message,
      role: "user",
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const response = await sendMessageToChatAPI(newMessage); // Pass updatedMessages directly
      if (response) {
        const chatGPTResponse = {
          content: response,
          role: "assistant",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function sendMessageToChatAPI(newMessage) {
    const data = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation: [...messages, newMessage],
      }),
    });
    let resp = await data.json();
    return resp;
  }

  return (
    <>
      <Head>
        <title>
          AttorneyAI: Expert AI Legal Assistance for Personal Injury Cases
        </title>
        <meta
          name="description"
          content="Get expert legal advice with AttorneyAI, your AI-powered assistant for navigating personal injury claims. Discover how our AI can guide you through the legal process, helping you understand your rights and options."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="AttorneyAI: Expert AI Legal Assistance for Personal Injury Cases"
        />
        <meta
          property="og:description"
          content="Explore AI-driven legal advice for personal injury with AttorneyAI. Understand your rights and make informed decisions with the help of AI."
        />
        <meta property="og:image" content="https://i.imgur.com/8UNngfq.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <div className="relative h-full w-full items-center">
        <div
          className="absolute pattern-dots pattern-gray-500 pattern-bg-white 
  pattern-size-6 pattern-opacity-10 w-full h-screen bg-black z-0"
        ></div>
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 ">
            <a href="/" className="-m-2 p-1.5 bg-white z-10">
              <span className="text-xl font-bold text-black ">Attorney AI</span>
            </a>
          </div>
        </nav>
        <div className="px-6 pt-12 sm:pt-12 lg:px-8 bg-white z-10 block opacity-100">
          <div className="mx-auto max-w-2xl text-center bg-white z-10 block opacity-100">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl bg-white z-10 block opacity-100">
              Attorney AI
            </h1>
            <h2 className="mt-4 text-lg leading-8 text-gray-700 font-bold">
              Let's discuss your case and see what your injury could be worth -
              even if insurance has already offered you a settlement.
            </h2>
          </div>
        </div>

        <div className="mx-8 md:mx-64 rounded  border border-r-2 border-b-2 border-black mt-6 h-1/2">
          <MainContainer style={{height: "400px"}}>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="AttorneyAI is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  if (message.role === "system") {
                    return <div className="hidden"></div>;
                  }
                  const messageClass =
                    message.role === "assistant"
                      ? "bg-gray-300 text-left flex justify-start"
                      : "bg-blue-100 text-right flex justify-end";
                  return (
                    <div
                      key={i}
                      className={`flex w-full ${
                        message.role === "assistant"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <p
                        className={`${messageClass} p-2 rounded-lg max-w-xs mx-2 my-1`}
                      >
                        {message.content}
                      </p>
                    </div>
                  );
                })}
              </MessageList>
              <MessageInput
                placeholder="Send a Message"
                onSend={handleSendRequest}
              />
            </ChatContainer>
          </MainContainer>
        </div>
        <div className="faq-section bg-white py-8 mt-8 mx-8 md:mx-64">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-6">
              Frequently Asked Questions about Personal Injury Law and
              AttorneyAI
            </h2>

            <div className="faq-item mb-8">
              <h3 className="text-xl font-semibold">What is AttorneyAI?</h3>
              <p>
                AttorneyAI is a cutting-edge AI-driven platform tailored to
                assist individuals in navigating personal injury cases. It
                leverages advanced AI technology to provide personalized legal
                advice, helping users understand complex legal scenarios related
                to personal injuries.
              </p>
            </div>

            <div className="faq-item mb-8">
              <h3 className="text-xl font-semibold">
                How can AttorneyAI help with my personal injury claim?
              </h3>
              <p>
                AttorneyAI uses sophisticated AI algorithms trained on extensive
                legal databases to analyze your personal injury case details and
                provide precise, contextually relevant advice. This can help you
                understand your rights, potential compensation, and the steps
                necessary for pursuing your claim.
              </p>
            </div>

            <div className="faq-item mb-8">
              <h3 className="text-xl font-semibold">
                Who can benefit from using AttorneyAI in personal injury cases?
              </h3>
              <p>
                Individuals who have suffered personal injuries and are seeking
                legal advice, law students interested in personal injury law,
                legal professionals seeking quick references, or anyone needing
                guidance on personal injury procedures can benefit from
                AttorneyAI.
              </p>
            </div>

            <div className="faq-item mb-8">
              <h3 className="text-xl font-semibold">
                Is AttorneyAI a substitute for a personal injury lawyer?
              </h3>
              <p>
                While AttorneyAI provides valuable legal information and
                guidance, it is not a substitute for a qualified personal injury
                lawyer. We recommend consulting with a professional for critical
                matters involving complex legal proceedings or significant
                financial implications.
              </p>
            </div>

            <div className="faq-item mb-8">
              <h3 className="text-xl font-semibold">
                How accurate is the personal injury advice provided by
                AttorneyAI?
              </h3>
              <p>
                AttorneyAI aims to deliver the most accurate and up-to-date
                legal information possible. However, users should consider
                verifying the advice through additional legal consultations,
                especially in complex personal injury cases.
              </p>
            </div>

            <div className="faq-item mb-8">
              <h3 className="text-xl font-semibold">
                Is there a cost to use AttorneyAI for personal injury advice?
              </h3>
              <p>
                AttorneyAI offers various services, some of which may be
                available for free. For more comprehensive features or detailed
                legal advice, a subscription or payment may be required. Check
                our platform for detailed pricing and service options.
              </p>
            </div>

            <div className="faq-item mb-8">
              <h3 className="text-xl font-semibold">
                How does AttorneyAI protect my personal information in personal
                injury cases?
              </h3>
              <p>
                AttorneyAI is equipped with robust security measures to
                safeguard your data. All interactions are encrypted, ensuring
                that your personal injury case details remain confidential and
                secure.
              </p>
            </div>

            <div className="faq-item mb-8">
              <h3 className="text-xl font-semibold">
                Can AttorneyAI assist with legal documentation for personal
                injury claims?
              </h3>
              <p>
                Yes, AttorneyAI can help draft and review basic legal documents
                related to personal injury claims. For more complex documents,
                we advise seeking professional legal help.
              </p>
            </div>

            <div className="faq-item mb-8">
              <h3 className="text-xl font-semibold">
                How do I start using AttorneyAI for my personal injury case?
              </h3>
              <p>
                Getting started is easy. Visit our website, sign up if
                necessary, and you can immediately begin to input details of
                your personal injury case to receive tailored legal advice
                through our interactive chat interface.
              </p>
            </div>
          </div>
        </div>
        <footer className="text-center py-4 mt-8 bg-gray-100">
          <p>
            © Copyright {new Date().getFullYear()} -- ai-injury-attorney.com --
            all rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
