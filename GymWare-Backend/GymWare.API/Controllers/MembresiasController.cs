using GymWare.Entities;
using GymWare.Logic;
using GymWare.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace GymWare.API.Controllers
{
    public class MembresiasController : ApiController
    {
        private MembresiaLogic _me = new MembresiaLogic();

        // POST: api/Membresias/CreateRenovateMembresia
        [ResponseType(typeof(Membresia))]
        public IHttpActionResult CreateRenovateMembresia(MembresiaCuotaDTO membresiaCuotaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Membresia membresia = _me.CreateRenovateMembresia(membresiaCuotaDTO);
            if (membresia != null)
            {
                return Json(membresia);
            }
            else
            {
                return Json("Error al intentar crear/renovar la Membresia!");
            }
        }

    }
}
