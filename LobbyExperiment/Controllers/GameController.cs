using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LobbyExperiment.Controllers
{
    public class GameController : Controller
    {
        public IActionResult QuizView(string groupName)
        {
            ViewData["groupName"] = groupName;
            //quiz information will be given by database based on category and passed to html with view model

            return View();
        }
    }
}
