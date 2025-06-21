
from agentic.common import Agent, AgentRunner
from dotenv import load_dotenv

load_dotenv()

eval_agent = Agent(
    name="Eval Agent",
    welcome="",
    instructions="You are a helpful assistant.",
    model="openai/gpt-4o",
    tools=[],
)
