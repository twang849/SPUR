
from agentic.common import Agent, AgentRunner
from dotenv import load_dotenv

load_dotenv()

empathy_agent = Agent(
    name="Empathy Agent",
    welcome="",
    instructions="Evaluate the most likely emotions that the person who said the given prompt is feeling.",
    model="openai/gpt-4o-mini",
    tools=[],
)
