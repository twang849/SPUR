from typing import Callable, Dict, Optional
from agentic.tools.base import BaseAgenticTool
from agentic.tools.utils.registry import tool_registry, Dependency, ConfigRequirement
from agentic.common import RunContext
from openai import OpenAI

@tool_registry.register(
    name="WebSearchTool",           # Name of your tool
    description="Description",     # Description of what your tool does
    dependencies=[                 # External packages required by your tool
        Dependency(
            name="openai",
            version="1.75.0",
            type="pip",
        ),
    ],
    config_requirements=[          # Configuration settings required by your tool
        ConfigRequirement(
            key="OPENAI_API_KEY",
            description="openAI api key",
            required=True,         # Whether this setting is required
        ),
    ],
)

class WebSearch(BaseAgenticTool):
    """Search the web using openAI web search API"""

    def __init__(self):
        """Initialize your tool with any necessary parameters."""


    def get_tools(self) -> list[Callable]:
        """Return a list of functions that will be exposed to the agent."""
        return [
            self.web_search,
            # Add more functions here
        ]

    def web_search(self, run_context: RunContext, query: str) -> str:
        """
        Search the web
        """
        client = OpenAI()

        completion = client.chat.completions.create(
            model="gpt-4o-search-preview",
            web_search_options={},
            messages=[
                {
                    "role": "user",
                    "content": "What was a positive news story from today?",
                }
            ],
        )

        print(completion.choices[0].message.content)