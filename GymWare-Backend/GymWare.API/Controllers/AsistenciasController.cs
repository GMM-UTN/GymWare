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
using System.Web.Http.Cors;

namespace GymWare.API.Controllers
{
    public class AsistenciasController : ApiController
    {
        private AsistenciaLogic _as = new AsistenciaLogic();

        // POST: api/Asistencias/CreateAsistencia
        [ResponseType(typeof(Asistencia))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "POST")]
        public IHttpActionResult CreateAsistencia(Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Json(_as.CreateAsistencia(cliente.Dni));
        }

        // GET: api/Asistencias/GetTodayAsistencias
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "GET")]
        public List<Asistencia> GetTodayAsistencias()
        {
            return _as.GetTodayAsistencias();
        }

    }
}

