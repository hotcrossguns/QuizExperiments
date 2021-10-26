using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LobbyExperiment.Lobbies
{
    public class GroupInformation
    {
        public List<Group> groups = new();

        public static GroupInformation uniqueInstance = new();

        public int maximumCapacity = 3;

        public int startCapacity = 3;

        private GroupInformation()
        {
        }

        public string GenerateGroupName()
        {
            string groupName = "group " + (groups.Count + 1);
            //TODO check name does not exist
            return groupName;
        }

        public string FindGroupName()
        {
            string result = null;
            for (int i = 0; i < groups.Count; i++)
            {
                if(groups[i].players.Count < maximumCapacity)
                {
                    result = groups[i].name;
                }
            }
            return result;
        }

        public void AddGroup(string groupName)
        {
            Group newGroup = new(groupName);
            groups.Add(newGroup);
        }

        public void AddMember(string groupName, string playerName)
        {
            for (int i = 0; i < groups.Count; i++)
            {
                if (groupName.Equals(groups[i].name))
                {
                    groups[i].AddMember(playerName);
                }
            }
        }

        public void RemoveMember(string groupName, string playerName)
        {
            for (int i = 0; i < groups.Count; i++)
            {
                if (groupName.Equals(groups[i].name))
                {
                    groups[i].RemoveMember(playerName);
                }
            }
        }

        public List<string> GetListOfPlayers(string groupName)
        {
            List<string> players = new();
            for (int i = 0; i < groups.Count; i++)
            {
                if (groupName.Equals(groups[i].name))
                {
                    players = groups[i].players;
                }
            }
            return players;
        }

        public string FindGroupNameOfPlayer(string playerName)
        {
            for (int i = 0; i < groups.Count; i++)
            {
                List<string> playersInGroup = groups[i].players;
                for (int j = 0; j < playersInGroup.Count; j++)
                {
                    if (playerName.Equals(playersInGroup[j]))
                    {
                        return groups[i].name;
                    }
                }
            }
            throw new Exception("no group found");
        }   
    }
}
