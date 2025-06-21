from .tools.websearch import WebSearch
from agentic.common import Agent, AgentRunner
from dotenv import load_dotenv

load_dotenv()

strategy_agent = Agent(
    name="Strategy Agent",
    welcome="",
    instructions="You search the web for therapeutical strategies tailored to a certain prompt.",
    model="openai/gpt-4o-mini",
    tools=[WebSearch()],
)
