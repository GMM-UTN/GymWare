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
    public class ComidasController : ApiController
    {
        private ComidaLogic _co = new ComidaLogic();
        // GET: api/Comidas
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "GET")]
        public List<Comida> GetComidas()
        {
            return _co.GetAll();
        }

        // GET: api/Comidas/5
        [ResponseType(typeof(Comida))]
        public IHttpActionResult GetComida(int id)
        {
            Comida comida = _co.GetOne(id);
            if (comida == null)
            {
                return NotFound();
            }

            return Ok(comida);
        }

        // PUT: api/Comidas/5
        [ResponseType(typeof(void))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "PUT")]
        public IHttpActionResult PutComida(int id, Comida comida)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (_co.Update(id, comida))
            {
                return Ok("Modificado correctamente");
            }
            else
            {
                return Ok("Error al modificar");
            }
        }

        // POST: api/Comidas
        [ResponseType(typeof(Comida))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "POST")]
        public IHttpActionResult PostComida(Comida comida)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_co.Insert(comida));
        }

        // DELETE: api/Comidas/5
        [ResponseType(typeof(Comida))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "DELETE")]
        public IHttpActionResult DeleteComida(int id)
        {
            return Ok(_co.Delete(id));
        }
    }
}

