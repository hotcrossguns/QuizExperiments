using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LobbyExperiment.Lobbies
{
    public class Group
    {
        public string name { get; set; }
        public int numberOfPlayers { get; set; }
        public List<string> players { get; set; }

        public Group(string name)
        {
            this.name = name;
            players = new();
        }

        public void AddMember(string playerName)
        {
            players.Add(playerName);
        }

        public void RemoveMember(string playerName)
        {
            players.Remove(playerName);
        }
    }
}
