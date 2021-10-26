using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LobbyExperiment.Controllers
{
    public class LobbyController : Controller
    {
        public IActionResult LobbyView()
        {
            return View();
        }
    }
}
