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
    public class AsistenciasController : ApiController
    {
        private AsistenciaLogic _as = new AsistenciaLogic();

        // POST: api/Asistencias/CreateAsistencia
        [ResponseType(typeof(Asistencia))]
        public IHttpActionResult CreateAsistencia(Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Asistencia asistencia = _as.CreateAsistencia(cliente.Dni);
            if (asistencia != null)
            {
                return Json(asistencia);
            }
            else
            {
                return Json("Error al intentar registrar la Asistencia!");
            }
        }

    }
}

