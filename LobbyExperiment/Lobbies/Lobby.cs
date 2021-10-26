using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace LobbyExperiment.Lobbies
{
    public class Lobby : Hub
    {
        GroupInformation groupInfo = GroupInformation.uniqueInstance;

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string groupName = groupInfo.FindGroupNameOfPlayer(Context.ConnectionId);
            await RemoveFromGroup(groupName);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            groupInfo.AddMember(groupName, Context.ConnectionId);
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            groupInfo.RemoveMember(groupName, Context.ConnectionId);
            await GetListOfPlayers(groupName);
        }

        public async Task GetListOfPlayers(string groupName)
        {
            List<string> players;
            players = groupInfo.GetListOfPlayers(groupName);
            int numberNeeded = groupInfo.startCapacity - players.Count;
            await Clients.Group(groupName).SendAsync("UpdatePlayerList", players, numberNeeded);
        }

        public async Task SendGroupName(string groupName)
        {
            await Clients.Client(Context.ConnectionId).SendAsync("ReceiveGroupName", groupName);
        }

        public async Task GenerateNewGroup()
        {
            string groupName = groupInfo.GenerateGroupName();
            groupInfo.AddGroup(groupName);
            await SendGroupName(groupName);
        }

        public async Task FindGroupName()
        {
            string groupName = groupInfo.FindGroupName();
            if(groupName == null)
            {
                await GenerateNewGroup();
            }
            else
            {
                await SendGroupName(groupName);
            }
        }

        public async Task StartGroupGame(string groupName)
        {
            await Clients.Group(groupName).SendAsync("StartGame");
        }

        public async Task SendResultToGroup(string groupName, string resultString)
        {
            //string result = $"{Context.ConnectionId} picked {option} in {time} seconds";
            string result = Context.ConnectionId + resultString;
            await Clients.Group(groupName).SendAsync("receiveResult", result);
        }
    }
}
