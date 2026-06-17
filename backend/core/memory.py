from typing import List, Dict
import uuid

_memory_store: Dict[str, List[Dict[str, str]]] = {}
_identifier_to_lead: Dict[str, str] = {}

def get_or_create_lead_id(identifier: str) -> str:
    if identifier not in _identifier_to_lead:
        if identifier.startswith("+"):
            _identifier_to_lead[identifier] = identifier
        else:
            _identifier_to_lead[identifier] = "+15872067434"
    return _identifier_to_lead[identifier]

def get_conversation_history(lead_id: str) -> List[Dict[str, str]]:
    if lead_id not in _memory_store:
        _memory_store[lead_id] = []
    return _memory_store[lead_id]

def add_message(lead_id: str, role: str, content: str):
    if lead_id not in _memory_store:
        _memory_store[lead_id] = []
    _memory_store[lead_id].append({"role": role, "content": content})

def clear_memory(lead_id: str):
    if lead_id in _memory_store:
        _memory_store[lead_id] = []
