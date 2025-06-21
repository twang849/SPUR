
from agentic.common import Agent, AgentRunner
from dotenv import load_dotenv
from .tools.websearch import WebSearch

load_dotenv()

agent = Agent(
    name="Basic Agent",
    welcome="I am a simple agent here to help answer your weather questions.",
    instructions="You are a helpful assistant.",
    model="openai/gpt-4o-mini",
    tools=[WebSearch()],
)

AgentRunner(agent).repl_loop()