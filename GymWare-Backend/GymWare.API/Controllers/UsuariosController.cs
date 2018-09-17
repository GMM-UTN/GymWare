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
    public class UsuariosController : ApiController
    {
        private UsuarioLogic _us = new UsuarioLogic();

        // GET: api/Usuarios/GetClientes
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "GET")]
        public List<Cliente> GetClientes()
        {
            return _us.GetAll();
        }

        //POST: api/Usuarios/CheckUsuario
        [ResponseType(typeof(Usuario))]

        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "POST")]
        public IHttpActionResult CheckUsuario(UsuarioLoginDTO usuarioLoginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Usuario usuario = _us.CheckUsuario(usuarioLoginDTO);
            if (usuario != null)
            {
                return Json(usuario);
            }
            else
            {
                return Json("Usuario o Contraseña incorrectos!");
            }
        }

        // POST: api/Usuarios/CreateCliente
        [ResponseType(typeof(Cliente))]
        public IHttpActionResult CreateCliente(Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_us.Insert(cliente))
            {
                return CreatedAtRoute("DefaultApi", new { id = cliente.ClienteId }, cliente);
            }
            else
            {
                return Json("Error al intentar dar de alta el Cliente!");
            }
        }

    }
}
