
from agentic.common import Agent, AgentRunner
from dotenv import load_dotenv
from .empathy_agent import empathy_agent
from .eval_agent import eval_agent
from .intent_agent import intent_agent
from .strategy_agent import strategy_agent
from agentic.tools import TextToSpeechTool

load_dotenv()

agent = Agent(
    name="Main Agent",
    welcome="",
    instructions="You are a helpful assistant.",
    model="openai/gpt-4o-mini",
    tools=[],
)

AgentRunner(agent).repl_loop()