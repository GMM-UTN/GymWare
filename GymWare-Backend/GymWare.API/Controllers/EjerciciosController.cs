﻿using GymWare.Entities;
using GymWare.Logic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace GymWare.API.Controllers
{
    public class EjerciciosController : ApiController
    {
        private EjercicioLogic _ej = new EjercicioLogic();
        // GET: api/Ejercicios
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "GET")]
        public List<Ejercicio> GetEjercicios()
        {
            return _ej.GetAll();
        }

        // GET: api/Ejercicios/5
        [ResponseType(typeof(Ejercicio))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "GET")]
        public IHttpActionResult GetEjercicio(int id)
        {
            Ejercicio ejercicio = _ej.GetOne(id);
            if (ejercicio == null)
            {
                return NotFound();
            }

            return Ok(ejercicio);
        }

        // PUT: api/Ejercicios/5
        [ResponseType(typeof(void))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "PUT")]
        public IHttpActionResult PutEjercicio(int id, Ejercicio ejercicio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if(_ej.Update(id, ejercicio))
            {
                return Ok("Modificado correctamente");
            }
            else
            {
                return Ok("Error al modificar");
            }
        }

        // POST: api/Ejercicios
        [ResponseType(typeof(Ejercicio))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "POST")]
        public IHttpActionResult PostEjercicio(Ejercicio ejercicio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_ej.Insert(ejercicio));
        }

        // DELETE: api/Ejercicios/5
        [ResponseType(typeof(Ejercicio))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "DELETE")]
        public IHttpActionResult DeleteEjercicio(int id)
        {
            return Ok(_ej.Delete(id));            
        }
    }
}
