
from agentic.common import Agent, AgentRunner
from dotenv import load_dotenv

load_dotenv()

intent_agent = Agent(
    name="Intent Agent",
    welcome="",
    instructions="Evaluate the most likely intent and meaning behind this message.",
    model="openai/gpt-4o",
    tools=[],
)

